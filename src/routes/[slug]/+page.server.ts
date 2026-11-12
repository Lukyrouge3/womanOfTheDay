import { error } from '@sveltejs/kit';
import { loadEntries } from '#lib/server/content.ts';
import { suggest } from '#lib/server/suggest-action.ts';
import type { Actions, PageServerLoad } from './$types';

/** A woman's permanent page, so shared links keep pointing at her after her day has passed. */
export const load: PageServerLoad = ({ params, setHeaders }) => {
	const entry = loadEntries().find((e) => e.slug === params.slug);
	if (!entry) error(404, 'We couldn’t find that story.');
	setHeaders({ 'cache-control': 'public, max-age=300' });
	return { entry };
};

export const actions: Actions = { suggest };
