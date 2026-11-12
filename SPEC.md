# Woman of the Day

## Build spec
- Brief: A public website featuring, each day, a woman born on that date, focusing on "women that got shadowed by men". Some days have several (e.g. 12 October).
- Goal: v1 live on the OVH server, showing today's woman/women, fed by a content pipeline with reviewed entries at least one week ahead.
- Surface / users: SvelteKit app in Docker on the OVH dedicated server; public audience. CDN possibly later.
- Must have:
  - Today's page: headline hook (e.g. "She discovered it. He got the Nobel.") followed by the full bio.
  - Sources & further reading for each woman.
  - Share buttons + OG preview images.
  - "Suggest a woman" form.
  - Fallback pick on days with no entry: a woman from a nearby date, clearly labeled.
  - Fuzzy birthdates: feature the woman on another documented date (death, baptism, key achievement), labeled with the date type.
- Content pipeline: Wikidata gives candidates; Claude Code (in a session, no API) drafts bios and hooks; the user reviews every entry in an Obsidian vault tracked in git (one Markdown note per woman; frontmatter for date, date type, status `draft`/`approved`, sources, image credits). Only `approved` entries are published. Tooling on top later (templates, validation script, report of uncovered days in the next 7 days).
- Look: Warm & handmade, risograph-print style: a few spot inks (e.g. fluorescent pink, blue, yellow), grain, halftone, slight misregistration and overprint blending, on off-white paper. Fully riso/zine; almanac influence dropped for now. Light theme only.
- Typography: headlines in Le Murmure (Velvetyne, SIL OFL; self-hosted); body text in Atkinson Hyperlegible; details (dates, sources, image credits, labels) in Courier Prime. All three under SIL OFL and self-hosted. Real images only, never AI-generated: portraits, her work, her impact, her era. Openly licensed (e.g. Wikimedia Commons) and credited.
- Out of scope (v1): browsing other dates, multiple languages, live LLM calls, admin web UI, CDN.
- Constraints: English only; every entry approved by the user before publishing; no paid services required.
- Failure behavior: no approved entry, so show the fallback pick; no usable image, so use a design treatment without an image; nothing unreviewed is ever published.
- Taste references: risograph prints / zines.
- Image treatment (agreed 2026-11-12): real photos rendered as riso-style duotone/halftone via CSS/SVG filters. Same real image, no AI generation; original viewable via credit link.
- Outside judge: Fact-checking by the user and Claude for now; the user will ask people around them to review.
- Assumptions:
  - Form suggestions are stored in a small SQLite table (Docker volume) or emailed to the user.
  - v1 launches with about 2–3 weeks of approved seed entries.
  - "Browse other dates" is excluded from v1 because it was not selected.
- Agreed: 2026-11-12, approved by the user in the /grill-me session.
