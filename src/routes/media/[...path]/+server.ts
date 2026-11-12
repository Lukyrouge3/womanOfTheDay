import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { error } from '@sveltejs/kit';
import { vaultRoot } from '#lib/server/content.ts';
import { DATA_DIR } from '$app/env/private';
import crypto from 'node:crypto';
import type { RequestHandler } from './$types';

const TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.gif': 'image/gif'
};

/** Widths the page asks for (portraitSrcset in types.ts). Anything else gets the original. */
const WIDTHS = [240, 360, 480, 720, 960];

const cache = new Map<string, Buffer>();

/**
 * Serves images that live in the vault next to the notes: only image types, only inside the vault.
 * With ?w=, returns a resized WebP so phones don't download a full-size photo for a small portrait.
 */
export const GET: RequestHandler = async ({ params, url }) => {
	const root = vaultRoot();
	const file = path.resolve(root, params.path);
	const type = TYPES[path.extname(file).toLowerCase()];
	if (!type || !file.startsWith(root + path.sep) || !fs.existsSync(file)) error(404, 'Not found');

	const headers = { 'cache-control': 'public, max-age=604800' };
	const w = Number(url.searchParams.get('w'));
	if (!WIDTHS.includes(w)) {
		return new Response(fs.readFileSync(file), { headers: { ...headers, 'content-type': type } });
	}

	const key = `${file}:${fs.statSync(file).mtimeMs}:${w}`;
	let out = cache.get(key);
	// Resizing takes a moment, so results are also kept on disk across restarts.
	const diskFile = path.resolve(
		DATA_DIR,
		'media-cache',
		crypto.createHash('sha1').update(key).digest('hex') + '.webp'
	);
	if (!out && fs.existsSync(diskFile)) out = fs.readFileSync(diskFile);
	if (!out) {
		out = await sharp(file)
			.rotate()
			.resize({ width: w, withoutEnlargement: true })
			.webp({ quality: 74 })
			.toBuffer();
		try {
			fs.mkdirSync(path.dirname(diskFile), { recursive: true });
			fs.writeFileSync(diskFile, out);
		} catch (e) {
			console.warn('[media] could not write cache', e);
		}
	}
	if (cache.size > 300) cache.delete(cache.keys().next().value!);
	cache.set(key, out);
	return new Response(new Uint8Array(out), {
		headers: { ...headers, 'content-type': 'image/webp' }
	});
};
