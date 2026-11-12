import { SITE_TZ } from '$app/env/private';
import type { Entry, Today } from '#lib/types.ts';

const TZ = () => SITE_TZ;

/** Today's date (YYYY-MM-DD) in the site's time zone. */
export function todayIso(now = new Date()): string {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: TZ(),
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(now);
}

function dayOfYear(month: number, day: number): number {
	// A leap year, so 29 February has its own slot.
	return Math.round((Date.UTC(2024, month - 1, day) - Date.UTC(2024, 0, 1)) / 86_400_000);
}

function circularDistance(a: number, b: number): number {
	const d = Math.abs(a - b);
	return Math.min(d, 366 - d);
}

/**
 * Pick today's women. Exact date first; otherwise the nearest date that has entries
 * (earlier date wins a tie), so a day is never empty while any entry exists.
 */
export function pickToday(entries: Entry[], iso: string): Today {
	const [, m, d] = iso.split('-').map(Number);
	const exact = entries.filter((e) => e.month === m && e.day === d);
	if (exact.length) return { iso, month: m, day: d, kind: 'match', entries: exact };
	if (!entries.length) return { iso, month: m, day: d, kind: 'empty', entries: [] };

	const target = dayOfYear(m, d);
	let best: Entry[] = [];
	let bestDist = Infinity;
	let bestBefore = false;
	for (const e of entries) {
		const doy = dayOfYear(e.month, e.day);
		const dist = circularDistance(doy, target);
		const before = (target - doy + 366) % 366 === dist;
		if (dist < bestDist || (dist === bestDist && before && !bestBefore)) {
			best = [e];
			bestDist = dist;
			bestBefore = before;
		} else if (dist === bestDist && e.month === best[0].month && e.day === best[0].day) {
			best.push(e);
		}
	}
	return { iso, month: m, day: d, kind: 'fallback', entries: best };
}
