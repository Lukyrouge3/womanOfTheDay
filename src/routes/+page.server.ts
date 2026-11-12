import { fail } from '@sveltejs/kit';
import { dev } from '$app/env';
import { loadEntries } from '#lib/server/content.ts';
import { pickToday, todayIso } from '#lib/server/today.ts';
import { saveSuggestion } from '#lib/server/suggestions.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url, setHeaders }) => {
	let iso = todayIso();
	// Dev-only: preview another date with ?date=MM-DD. Browsing dates is not a public feature.
	const preview = dev ? url.searchParams.get('date') : null;
	if (preview && /^\d{2}-\d{2}$/.test(preview)) iso = `${iso.slice(0, 4)}-${preview}`;

	setHeaders({ 'cache-control': 'public, max-age=300' });
	return { today: pickToday(loadEntries(), iso) };
};

const clean = (v: FormDataEntryValue | null, max: number) =>
	typeof v === 'string' ? v.trim().slice(0, max) : '';

export const actions: Actions = {
	suggest: async ({ request }) => {
		const form = await request.formData();
		// Honeypot: real people never see or fill this field.
		if (clean(form.get('website'), 200)) return { sent: true };

		const values = {
			name: clean(form.get('name'), 200),
			reason: clean(form.get('reason'), 4000),
			source: clean(form.get('source'), 500),
			contact: clean(form.get('contact'), 200)
		};
		const errors: Record<string, string> = {};
		if (!values.name) errors.name = 'Add her name so we know who to look up.';
		if (values.reason.length < 10)
			errors.reason = 'Tell us in a sentence or two what she did and who got the credit.';
		if (Object.keys(errors).length) return fail(400, { errors, values });

		try {
			saveSuggestion({
				name: values.name,
				reason: values.reason,
				source: values.source || undefined,
				contact: values.contact || undefined
			});
		} catch (e) {
			console.error('[suggest] could not save', e);
			return fail(500, {
				errors: { form: 'Your suggestion didn’t save on our side. Please try again in a minute.' },
				values
			});
		}
		return { sent: true };
	}
};
