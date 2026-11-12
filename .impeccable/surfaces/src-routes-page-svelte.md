---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Today's page

Scope: `/` — today's woman or women. Visitor mode: Read. Build path: code-led.

Audience: mostly people arriving on a phone from a shared link; returning visitors and educators come second. Job: read who she was and what was taken from her, trust it (cited sources), share it.

Content: hook (~60 chars max), "official record" plaque line plus its source, label fields (name, date, date type, place, life span), a duotone portrait or none, a 400–800-word bio with numbered source marks, sources and further reading, image credits, share, inline suggest form.

States: one woman; several women (equal labels stacked, "N born today" line); fallback (stamp "NOT BORN TODAY · BORN 14 OCT"); fuzzy date (stamp BAPTISED / DIED / ACHIEVEMENT); no image (all-type label); no single man to cover (the plaque shows the official record); long names and hooks grow downwards; form idle / sending / sent ("RECEIVED" stamp) / error.

Anti-goals: mascots or cute doodles; texture behind the body text; cream-plus-serif or terracotta; invented facts; AI images.

Open: accessibility target WCAG AA (confirmed). Two repos (site, vault).

## Direction contract

THESIS: Each day is a riso sticker pasted over the official record, giving her the credit back. It refuses the "on this day" default of a big portrait with a headline over it.
OWN-WORLD: Off-white newsprint paper with grain. Fluorescent pink, riso blue and yellow spot inks that overprint (multiply) and misregister by 1–2px. A grey institutional plaque set in small caps. Sticker stock pasted askew with a slight lift. A Courier Prime museum label with ruled fields. Rubber stamps for states. Halftone duotone photos (blue plus pink). Le Murmure for headlines only.
STORY: The reader sees the official credit, sees it overruled, learns her name, dates and place, reads a calm sourced bio, checks the sources, shares, and maybe suggests a woman.
FIRST VIEWPORT: On a phone: a thin masthead line (WOMAN OF THE DAY · 12 NOV 2026). The grey plaque line runs full width near the top, half covered by a pink sticker rotated -2° that carries the hook in Le Murmure at about 44px. The label (name in Le Murmure at about 36px over Courier Prime fields) sits below, with the duotone portrait beside or under it. The bio starts just below the fold line.
FORM: Counter-Label, candidate 4 of 7 grounded. seed:a3e3dd09d5caa79a
Signature interaction: the sticker slaps onto the plaque once at load (scale and rotate settle, ink offset settles into registration); reduced motion shows it already placed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
