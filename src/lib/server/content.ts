import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { VAULT_PATH, SHOW_DRAFTS } from '$app/env/private';
import { dev } from '$app/env';
import type { DateType, Entry, Source } from '#lib/types.ts';

const DATE_TYPES: DateType[] = ['birth', 'death', 'baptism', 'achievement'];

/** Root of the Obsidian vault (its own git repo). Falls back to the sample content in dev. */
export function vaultRoot(): string {
	return path.resolve(VAULT_PATH || 'content-sample');
}

/** Drafts are only ever shown when explicitly enabled, and never in production builds. */
export function showDrafts(): boolean {
	return dev && SHOW_DRAFTS === true;
}

const marked = new Marked({ gfm: true, breaks: false });

function monthDay(raw: unknown): { month: number; day: number } | null {
	if (raw instanceof Date && !isNaN(raw.valueOf())) {
		return { month: raw.getUTCMonth() + 1, day: raw.getUTCDate() };
	}
	if (typeof raw !== 'string') return null;
	// Accepts YYYY-MM-DD, -YYYY-MM-DD (BCE) or --MM-DD (year unknown).
	const m = raw.trim().match(/(\d{1,2})-(\d{1,2})$/);
	if (!m) return null;
	const month = Number(m[1]);
	const day = Number(m[2]);
	if (month < 1 || month > 12 || day < 1 || day > 31) return null;
	return { month, day };
}

function str(v: unknown): string | undefined {
	return typeof v === 'string' && v.trim() ? v.trim() : undefined;
}

function sources(v: unknown): Source[] {
	if (!Array.isArray(v)) return [];
	return v
		.map((s) => (typeof s === 'string' ? { title: s } : s))
		.filter((s): s is Record<string, unknown> => !!s && typeof s === 'object' && !!str(s.title))
		.map((s) => ({ title: str(s.title)!, url: str(s.url) }));
}

/** Turn [^3] into a numbered link to the matching source. */
function renderBio(body: string, slug: string, count: number): string {
	const withMarks = body.replace(/ ?\[\^(\d+)\]/g, (_, n: string) => {
		const i = Number(n);
		if (i < 1 || i > count) return '';
		return `<sup class="src-mark"><a href="#${slug}-src-${i}" id="${slug}-ref-${i}" aria-label="Source ${i}">${i}</a></sup>`;
	});
	return marked.parse(withMarks, { async: false }) as string;
}

function walk(dir: string, out: string[] = []): string[] {
	let items: fs.Dirent[];
	try {
		items = fs.readdirSync(dir, { withFileTypes: true });
	} catch {
		return out;
	}
	for (const item of items) {
		if (item.name.startsWith('.') || item.name === 'templates' || item.name === 'node_modules') continue;
		const full = path.join(dir, item.name);
		if (item.isDirectory()) walk(full, out);
		else if (item.name.endsWith('.md')) out.push(full);
	}
	return out;
}

function parse(file: string): Entry | null {
	const { data, content } = matter(fs.readFileSync(file, 'utf8'));
	const name = str(data.name);
	const hook = str(data.hook);
	const md = monthDay(data.date);
	const status = data.status === 'approved' ? 'approved' : 'draft';
	if (!name || !hook || !md || !content.trim()) {
		console.warn(`[content] skipped ${path.basename(file)}: needs name, hook, date and a bio`);
		return null;
	}
	const slug = path.basename(file, '.md');
	const dateType: DateType = DATE_TYPES.includes(data.date_type) ? data.date_type : 'birth';
	const srcs = sources(data.sources);
	const img = data.image && typeof data.image === 'object' ? data.image : null;
	const recordSource = Number(data.official_record_source);

	return {
		slug,
		name,
		status,
		month: md.month,
		day: md.day,
		dateType,
		dateNote: str(data.date_note),
		born: str(data.born),
		died: str(data.died),
		role: str(data.role),
		hook,
		officialRecord: str(data.official_record),
		officialRecordSource:
			recordSource >= 1 && recordSource <= srcs.length ? recordSource : undefined,
		image:
			img && str(img.file)
				? {
						src: `/media/${str(img.file)!.split('/').map(encodeURIComponent).join('/')}`,
						alt: str(img.alt) ?? '',
						caption: str(img.caption),
						credit: str(img.credit),
						license: str(img.license),
						sourceUrl: str(img.source_url)
					}
				: undefined,
		sources: srcs,
		furtherReading: sources(data.further_reading),
		bioHtml: renderBio(content, slug, srcs.length)
	};
}

let cache: { at: number; entries: Entry[] } | null = null;

/** Every publishable entry. Re-reads the vault at most once a minute so `git pull` shows up without a restart. */
export function loadEntries(): Entry[] {
	if (cache && Date.now() - cache.at < (dev ? 0 : 60_000)) return cache.entries;
	const entries = walk(vaultRoot())
		.map((f) => {
			try {
				return parse(f);
			} catch (e) {
				console.warn(`[content] could not read ${f}:`, e);
				return null;
			}
		})
		.filter((e): e is Entry => !!e && (e.status === 'approved' || showDrafts()))
		.sort((a, b) => a.name.localeCompare(b.name));
	cache = { at: Date.now(), entries };
	return entries;
}
