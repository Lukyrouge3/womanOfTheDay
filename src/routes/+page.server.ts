import { dev } from '$app/env';
import { loadEntries } from '#lib/server/content.ts';
import { pickToday, todayIso } from '#lib/server/today.ts';
import { suggest } from '#lib/server/suggest-action.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url, setHeaders }) => {
	let iso = todayIso();
	// Dev-only: preview another date with ?date=MM-DD. Browsing dates is not a public feature.
	const preview = dev ? url.searchParams.get('date') : null;
	if (preview && /^\d{2}-\d{2}$/.test(preview)) iso = `${iso.slice(0, 4)}-${preview}`;

	setHeaders({ 'cache-control': 'public, max-age=300' });
	return { today: pickToday(loadEntries(), iso) };
};

export const actions: Actions = { suggest };
