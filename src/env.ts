import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	VAULT_PATH: {
		description: 'Path to the Obsidian vault checkout (its own git repo). Defaults to ./content-sample.',
		schema: optional
	},
	SHOW_DRAFTS: {
		description: '"true" also shows draft entries (dev or pnpm preview). Never set it on the server.',
		schema: (v) => v === 'true'
	},
	SITE_TZ: {
		description: 'Time zone that decides when the day changes. Defaults to Europe/Paris.',
		schema: (v) => v || 'Europe/Paris'
	},
	DATA_DIR: {
		description: 'Where the suggestions database lives (a Docker volume in production).',
		schema: (v) => v || 'data'
	}
});
