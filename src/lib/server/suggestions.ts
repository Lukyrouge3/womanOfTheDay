import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { DATA_DIR } from '$app/env/private';

let db: DatabaseSync | null = null;

function open(): DatabaseSync {
	if (db) return db;
	const file = path.resolve(DATA_DIR, 'suggestions.sqlite');
	fs.mkdirSync(path.dirname(file), { recursive: true });
	db = new DatabaseSync(file);
	db.exec(`CREATE TABLE IF NOT EXISTS suggestions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		name TEXT NOT NULL,
		reason TEXT NOT NULL,
		source TEXT,
		contact TEXT
	)`);
	return db;
}

export interface Suggestion {
	name: string;
	reason: string;
	source?: string;
	contact?: string;
}

export function saveSuggestion(s: Suggestion): void {
	open()
		.prepare('INSERT INTO suggestions (name, reason, source, contact) VALUES (?, ?, ?, ?)')
		.run(s.name, s.reason, s.source ?? null, s.contact ?? null);
}
