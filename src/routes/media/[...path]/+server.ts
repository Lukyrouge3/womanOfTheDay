import fs from 'node:fs';
import path from 'node:path';
import { error } from '@sveltejs/kit';
import { vaultRoot } from '#lib/server/content.ts';
import type { RequestHandler } from './$types';

const TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.gif': 'image/gif'
};

/** Serves images that live in the vault next to the notes. Only image types, only inside the vault. */
export const GET: RequestHandler = ({ params }) => {
	const root = vaultRoot();
	const file = path.resolve(root, params.path);
	const type = TYPES[path.extname(file).toLowerCase()];
	if (!type || !file.startsWith(root + path.sep) || !fs.existsSync(file)) error(404, 'Not found');
	return new Response(fs.readFileSync(file), {
		headers: { 'content-type': type, 'cache-control': 'public, max-age=86400' }
	});
};
