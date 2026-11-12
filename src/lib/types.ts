export type DateType = 'birth' | 'death' | 'baptism' | 'achievement';

export interface Source {
	title: string;
	url?: string;
}

export interface EntryImage {
	src: string;
	alt: string;
	caption?: string;
	credit?: string;
	license?: string;
	sourceUrl?: string;
}

export interface Entry {
	slug: string;
	name: string;
	status: 'draft' | 'approved';
	month: number;
	day: number;
	dateType: DateType;
	dateNote?: string;
	born?: string;
	died?: string;
	role?: string;
	hook: string;
	officialRecord?: string;
	officialRecordSource?: number;
	image?: EntryImage;
	sources: Source[];
	furtherReading: Source[];
	bioHtml: string;
}

export interface Today {
	/** ISO date of the day being shown, in the site's time zone. */
	iso: string;
	month: number;
	day: number;
	/** 'match' when entries are on today's date, 'fallback' for the nearest date, 'empty' when there are none at all. */
	kind: 'match' | 'fallback' | 'empty';
	entries: Entry[];
}

export const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export const DATE_TYPE_VERB: Record<DateType, string> = {
	birth: 'Born',
	death: 'Died',
	baptism: 'Baptised',
	achievement: 'On this day'
};
