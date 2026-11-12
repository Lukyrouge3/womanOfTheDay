import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Entry } from '#lib/types.ts';

function firstExisting(...candidates: string[]): Buffer {
	for (const c of candidates) {
		const p = path.resolve(c);
		if (fs.existsSync(p)) return fs.readFileSync(p);
	}
	throw new Error(`Font not found: ${candidates[0]}`);
}

let fonts: Parameters<typeof satori>[1]['fonts'] | null = null;
function loadFonts() {
	if (fonts) return fonts;
	const fs_ = 'node_modules/@fontsource';
	fonts = [
		{
			name: 'Le Murmure',
			weight: 400,
			style: 'normal',
			data: firstExisting(
				'static/fonts/le-murmure/LeMurmure-Regular.woff',
				'build/client/fonts/le-murmure/LeMurmure-Regular.woff'
			)
		},
		{
			name: 'Atkinson Hyperlegible',
			weight: 700,
			style: 'normal',
			data: firstExisting(`${fs_}/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff`)
		},
		{
			name: 'Courier Prime',
			weight: 700,
			style: 'normal',
			data: firstExisting(`${fs_}/courier-prime/files/courier-prime-latin-700-normal.woff`)
		}
	];
	return fonts;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children }
});

const cache = new Map<string, Buffer>();

/** The share image: the sticker pasted over the official record, at 1200 × 630. */
export async function renderOg(entry: Entry): Promise<Buffer> {
	const key = `${entry.slug}:${entry.hook}:${entry.officialRecord ?? ''}`;
	const hit = cache.get(key);
	if (hit) return hit;

	// One sentence per line, the way the sticker sets it.
	const lines = entry.hook.split(/(?<=[.!?])\s+/).filter(Boolean);
	const longest = Math.max(...lines.map((l) => l.length));
	const hookSize = Math.max(72, Math.min(118, Math.floor(2700 / longest)));
	const hookText = (color: string, extra: Record<string, unknown> = {}) =>
		h(
			'div',
			{
				flexDirection: 'column',
				fontFamily: 'Le Murmure',
				fontSize: hookSize,
				lineHeight: 0.92,
				color,
				...extra
			},
			lines.map((l) => h('div', {}, l))
		);

	const tree = h(
		'div',
		{
			width: 1200,
			height: 630,
			flexDirection: 'column',
			background: '#f3f1ec',
			padding: '48px 64px',
			color: '#1d1d1b',
			boxSizing: 'border-box'
		},
		[
			h('div', { width: 1072, justifyContent: 'space-between', alignItems: 'baseline' }, [
				h('div', { fontFamily: 'Le Murmure', fontSize: 44 }, 'Woman of the Day'),
				h(
					'div',
					{ fontFamily: 'Courier Prime', fontSize: 22, letterSpacing: 2, color: '#46443f' },
					entry.name.toUpperCase()
				)
			]),
			h('div', { width: 1072, height: 6, background: '#ffe800', marginTop: 14 }),
			h(
				'div',
				{
					width: 1072,
					marginTop: 28,
					padding: '20px 30px 64px',
					background: '#dddad3',
					border: '2px solid #9a988f',
					fontFamily: 'Atkinson Hyperlegible',
					fontSize: 24,
					letterSpacing: 1.5,
					lineHeight: 1.3,
					color: '#48473f',
					textTransform: 'uppercase'
				},
				entry.officialRecord ?? 'The official record'
			),
			h(
				'div',
				{
					position: 'relative',
					marginTop: -54,
					marginLeft: 24,
					width: 980,
					padding: '30px 38px 36px',
					background: '#ff48b0',
					transform: 'rotate(-2deg)',
					boxShadow: '0 14px 22px -10px rgba(29,29,27,0.45)'
				},
				[
					// Misregistered yellow pass (yellow over pink prints as this red-orange).
					hookText('#ff4100', { position: 'absolute', left: 42, top: 33, right: 34 }),
					hookText('#002284', { position: 'relative' })
				]
			)
		]
	);

	const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
	cache.set(key, png);
	return png;
}
