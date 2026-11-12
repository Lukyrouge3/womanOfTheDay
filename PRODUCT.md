# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit + Tailwind CSS app running in Docker on the owner's OVH dedicated server. Content comes from Markdown notes in an Obsidian vault kept in its own git repo, separate from the site code, so the vault's sync commits (Obsidian Git plugin) never touch the app's history. The site reads approved notes from the vault repo. Decided 2026-11-12. Form suggestions go to a small SQLite table (Docker volume) or by email; this is still an assumption. No CDN in v1.

## Users

- **Primary: shared-link readers.** Curious members of the public who arrive from a link shared on social media or in a chat. They read one woman's story in a few minutes and may share it in turn. The share preview (the OG image and hook) is often their first contact with the product.
- **Secondary: returning followers.** People who come back to see who is featured today.
- **Secondary: educators, students and history fans.** They use an entry as a starting point and depend on its sources and further-reading links.

## Product Purpose

Each day the site features a woman born on that date who was overlooked by history. Some dates feature several women (e.g. 12 October). The site exists to put these women back in view, one day at a time. Success for v1 means the site is live, shows today's woman or women every day, and has reviewed entries prepared at least one week ahead.

## Positioning

The site shows one date and one story each day, and every entry is reviewed by a human before it goes out. Each story opens with a sharp hook that names the injustice, followed by a sourced bio. A content pipeline backs this: candidates come from Wikidata, drafts are written in Claude Code sessions, and the owner approves every note before it goes live. Nothing unreviewed is ever published.

## Operating Context

- Review setup: Claude works on the server and pushes notes to the vault repo. The owner reviews in Obsidian on their own computer, synced through the Obsidian Git plugin (auto-commit optional).
- Pipeline: Wikidata supplies candidates. Claude Code drafts the bio and hook in a session; there are no live API calls. The owner reviews each entry in Obsidian (one Markdown note per woman, with frontmatter for date, date type, status `draft`/`approved`, sources and image credits). Only `approved` entries are published.
- Later tooling, not yet built: templates, a validation script, and a report of days in the next 7 days that have no entry.
- Fact-checking is done by the owner and Claude for now; the owner plans to ask people around them to review.
- v1 is planned to launch with roughly 2–3 weeks of approved seed entries.

## Capabilities and Constraints

- **Today's page:** headline hook, then the full bio, then sources and further reading.
- **Share buttons and OG preview images** for each entry.
- **"Suggest a woman" form.**
- **Fallback pick:** on a day with no approved entry, the page features a woman from a nearby date and says so clearly.
- **Fuzzy birthdates:** when a woman's birthdate is unknown, she is featured on another documented date (death, baptism, key achievement) and the page labels the date type.
- **No usable image:** the page uses a design treatment without a photo; there is never a blank or placeholder.
- **Editorial line:** any woman historically under-recognised. The "shadowed by men" angle (credit taken by a man, eclipsed by a husband or peer, erased by male-dominated institutions) is preferred but not required.
- English only. No paid services required. No live LLM calls.
- Out of scope for v1: browsing other dates, multiple languages, an admin web UI, a CDN.
- Undecided: whether suggestions go to SQLite or email; an accessibility target (WCAG level) has not been set.

## Brand Commitments

- **Name:** Woman of the Day (working name).
- **Voice: righteous and angry.** Hooks and bios openly name the injustice and who took the credit, e.g. "She discovered it. He got the Nobel." The anger has to rest on sourced fact. When a woman was overlooked without a specific man taking her credit, the anger targets the erasure and the institutions behind it, never an invented villain.
- **Images:** real images only, never AI-generated. They can show her portrait, her work, her impact or her era. Images must be openly licensed (e.g. Wikimedia Commons) and credited, with the original reachable from the credit link.
- **Fonts (binding, self-hosted, SIL OFL):** Le Murmure for headlines, Atkinson Hyperlegible for body text, Courier Prime for details (dates, sources, image credits, labels).
- **Visual direction (binding, from SPEC.md, to be developed in new-work):** a risograph/zine print look in a light theme only. Real photos are rendered as riso-style duotone/halftone through CSS/SVG filters.

## Evidence on Hand

- `SPEC.md`: the agreed build spec (2026-11-12).
- No entries, images, testimonials, press or traffic data exist yet. Future work must not invent any women, facts, quotes, sources or image credits. Every factual claim on the site comes from an approved vault note.

## Product Principles

1. **Nothing unreviewed ships.** Every published fact has gone through the owner's approval.
2. **The anger must be earned.** Each indignant line rests on a cited source; outrage never stands in for evidence.
3. **She is the subject.** The men involved appear only as context for her story, never as its centre.
4. **Be honest about uncertainty.** Non-birth dates are labelled, and her real dates are always on the page, so a nearest-date pick never claims she was born today. (Owner chose on 2026-11-12 not to stamp fallback picks.)
5. **Built to be shared.** The hook and preview should make sense on their own in a feed, and the full page has to deliver on what the hook promised.
