import { error } from '@sveltejs/kit';
import { loadEntries } from '#lib/server/content.ts';
import { renderOg } from '#lib/server/og.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const entry = loadEntries().find((e) => e.slug === params.slug);
	if (!entry) error(404, 'Not found');
	const png = await renderOg(entry);
	return new Response(new Uint8Array(png), {
		headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=3600' }
	});
};
