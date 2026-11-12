---
name: Woman of the Day
description: Each day, a riso sticker pasted over the official record, giving her the credit back.
colors:
  paper: "#f3f1ec"
  paper-shade: "#e6e3dc"
  ink: "#1d1d1b"
  ink-soft: "#46443f"
  pink: "#ff48b0"
  pink-deep: "#b4005f"
  blue: "#0078bf"
  blue-deep: "#005a91"
  yellow: "#ffe800"
  plaque: "#dddad3"
  plaque-ink: "#48473f"
  overprint: "#002284"
typography:
  display:
    fontFamily: "Le Murmure, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(2.6rem, 10.5vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.92
  headline:
    fontFamily: "Le Murmure, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(2.4rem, 9vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 0.95
  title:
    fontFamily: "Le Murmure, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "\"onum\" 1"
  plaque:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "0.07em"
  detail:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  hairline: "2px"
  stamp: "3px"
spacing:
  gutter: "16px"
  gutter-sm: "32px"
  gutter-lg: "48px"
  block: "32px"
  section: "96px"
components:
  sticker:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.blue}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "16px"
  plaque:
    backgroundColor: "{colors.plaque}"
    textColor: "{colors.plaque-ink}"
    typography: "{typography.plaque}"
    rounded: "{rounded.none}"
    padding: "14px 16px 64px"
  stamp-blue:
    textColor: "{colors.blue-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "6px 10px 4px"
  stamp-pink:
    textColor: "{colors.pink-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.stamp}"
    padding: "6px 10px 4px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0 14px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.yellow}"
  button-ink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0 14px"
    height: "44px"
  button-sticker:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.blue}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  form-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: Woman of the Day

## Overview

**Creative North Star: "The Counter-Label"**

Every surface is a cheap, loud print job pasted over something official. A grey institutional plaque states the record as the institutions kept it; a fluorescent riso sticker is slapped across it, askew, and says what really happened. Below that sits a museum label typed in Courier with ruled fields, and then a calm reading column. The anger lives in the printed objects (sticker, stamps, overprinted ink); the reading itself is quiet, because the anger has to rest on sourced fact.

The material is newsprint: off-white paper with a faint fibre grain, three spot inks (fluorescent pink, riso blue, yellow) that multiply where they overlap and land a few pixels out of register. Photographs are never shown raw. Each real photo is screened twice, once per ink, and overprinted. Depth is physical, not interface depth: a sticker lifts off the plaque, a stamp sits flat in the paper. Light theme only, by binding brief.

Density is that of a printed broadsheet column on a phone: one story, top to bottom, with heavy ink rules between sections rather than cards.

**Key Characteristics:**
- Off-white grained paper; three spot inks that overprint with multiply and misregister by 2-3px.
- The plaque-and-sticker pair: official grey record overruled by a pink sticker rotated -2deg.
- Courier Prime museum-label fields with hairline rules for every fact, date, source and credit.
- Le Murmure for display only; Atkinson Hyperlegible for anything read at length.
- Real photos as two-ink halftone duotones; no photo means the name printed twice in two inks.
- Rubber stamps carry state (fuzzy date, received).

## Colors

Spot inks on newsprint: neutrals are paper and press-black, colour arrives only as fluorescent ink solids that overprint each other.

### Primary
- **Fluorescent Riso Pink** (pink): the sticker stock, the sticker-style submit button and native share button, the pink halftone pass of portraits and link underlines (2px). It is a ground and a mark, never body text.
- **Deep Fuchsia Ink** (pink-deep): pink in text-safe form. Validation errors, invalid field underline, form accent and caret colour.

### Secondary
- **Riso Blue** (blue): the hook printed over the sticker, the second halftone pass, the focus ring (3px, 3px offset), list markers and the misregistered masthead rule.
- **Deep Riso Blue** (blue-deep): blue in text-safe form. Section headings in the bio, the Sources heading, source numbers and source marks, the default stamp.
- **Overprint Navy** (overprint): what blue multiplied over pink prints as. Used literally only where multiply blending is unavailable (the share image); on the web it emerges from blending, never as a fill.

### Tertiary
- **Process Yellow** (yellow): the misregistered ghost pass under the hook, the thick masthead rule, text selection, hover fills on buttons, source marks and source links, and the highlight band on a targeted source.

### Neutral
- **Newsprint** (paper): page ground, carrying the paper grain; form panel fill.
- **Newsprint Shade** (paper-shade): scrollbar track; a quieter paper.
- **Press Black** (ink): body text, heavy 2px section rules, button and form-panel borders. At 25% opacity it draws every hairline field rule.
- **Faded Press Black** (ink-soft): secondary detail text, masthead date, captions, field labels, footer.
- **Plaque Grey** (plaque): the institutional record's ground, and only that.
- **Plaque Lettering** (plaque-ink): plaque text and its double-frame border (45% and 30% opacity).

### Named Rules
**The Spot Ink Rule.** Colour comes only from the three inks and their deep text-safe forms. No smooth gradients (a hard-stop band, like the highlighter on a targeted source, is ink, not a gradient), no tints between inks, no fourth hue. When inks meet, they multiply.

**The Text-Safe Ink Rule.** Pink and blue at full fluorescence are grounds, marks and display type over pink; any colour carrying small text uses the deep form (pink-deep, blue-deep) to hold WCAG AA on paper.

**The Official Grey Rule.** Plaque grey belongs to the official record. Nothing that speaks for her is ever set on grey.

## Typography

**Display Font:** Le Murmure (with Atkinson Hyperlegible, sans-serif)
**Body Font:** Atkinson Hyperlegible (with system-ui)
**Label/Mono Font:** Courier Prime (with Courier New, monospace)

**Character:** A condensed, poster-like display face shouts the hook; a legibility-first sans carries the story; a typewriter mono files the evidence like a museum label. All three are self-hosted and binding.

### Hierarchy
- **Display** (400, clamp(2.6rem, 10.5vw, 5.25rem), 0.92): the hook on the sticker, balanced. Printed twice: blue on top, yellow ghost underneath offset 3px/2px.
- **Headline** (400, clamp(2.4rem, 9vw, 3.75rem), 0.95): her name on the label; also "Suggest a woman" (clamp(2.4rem, 8vw, 3.5rem), 1). Masthead wordmark is Le Murmure at 1.65rem, 2.25rem from sm.
- **Title** (400, clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem), 1.05): bio section headings in deep riso blue; Sources (1.875rem) and Further reading (1.5rem) follow the same voice.
- **Body** (400, 1.125rem, 1.65, max 65ch, oldstyle numerals, pretty wrapping): the bio. The role line under the name uses body at 1.125rem in faded ink.
- **Plaque** (700, 0.8125rem / 0.875rem from sm, 0.07em, uppercase): the official record only. Bold Atkinson capitals read as engraved institutional lettering.
- **Detail** (400, 0.9375rem, Courier Prime): field values, sources, further reading. Captions and credits at 0.8125rem.
- **Label** (700, 0.75rem, 0.1-0.12em, uppercase, Courier Prime): field names (BORN, DIED, form labels). Buttons and stamps use the same caps voice at 0.875-0.9375rem with 0.06-0.08em tracking.

### Named Rules
**The Headlines-Only Rule.** Le Murmure is for the hook, names, section headings and the sticker button. It never sets a sentence meant to be read at length, a label or a number field.

**The Evidence Is Typed Rule.** Dates, places, sources, credits, source marks and stamps are Courier Prime. If it is something a reader might check, it is typed.

## Layout

A single column on a 72rem max container with 16px side gutters (32px from 640px, 48px from 1024px). The plaque-and-sticker header caps at 50rem; the bio, sources and share row cap at 65ch.

The label is a named-area grid. On phones: name full width, then facts beside a narrow portrait (8.5rem; 12rem from 640px), then stamps, then bio full width. From 768px the portrait moves to a right column (up to 22rem) spanning name, facts, stamps and bio, with a 40px column gap.

Vertical rhythm is print-like: 32-40px between the header and the label, 48px before sources, 96px before each further entry or the suggest form, with a 2px press-black rule and 48-64px of top padding marking each new section. Several women on one day are stacked equal entries, each with its own sticker, separated by that rule. Long names and hooks grow downward; nothing truncates.

## Elevation & Depth

Flat paper by default. Depth exists only where a physical object would cast it: the sticker lifting off the plaque, and the sticker-style submit button. Shadows are soft and offset downward, tinted with press black, never hard-edged. Stamps, plaque, label and buttons sit in the paper with no shadow.

### Shadow Vocabulary
- **Sticker lift** (`box-shadow: 0 10px 18px -10px rgb(29 29 27 / 0.45), 0 2px 3px -1px rgb(29 29 27 / 0.2)`): the hook sticker at rest.
- **Sticker in flight** (`box-shadow: 0 26px 30px -14px rgb(29 29 27 / 0.35)`): the first frame of the slap animation, before it lands.
- **Pressable sticker** (`box-shadow: 0 8px 14px -8px rgb(29 29 27 / 0.5)`): the submit button.

### Named Rules
**The Only Stickers Lift Rule.** A shadow means "this is a piece of stock pasted on top". Printed ink never lifts.

**The Grain Everywhere Rule.** The paper carries a faint fibre grain; ink solids carry a heavier mottled grain blended by multiply. No flat digital fills for the sticker, and no texture behind the reading column beyond the paper's own.

## Shapes

Hard print edges: the sticker, plaque, form panel and inputs are square (0px). Buttons have a barely-there 2px corner, like a die-cut; stamps a 3px corner with a 2.5px border plus a 1px outline set 2px outside it, the double frame of a rubber stamp. The plaque repeats the double frame inside itself (1px border, inner 1px border inset 4px). Rotation is part of the shape language: sticker -2deg, stamps -6 to +3deg, the submit button tips -1deg on hover. Rules are either hairlines (1px ink at 25%) for fields and footers, or heavy (2px ink) for section breaks.

## Components

### Buttons
Printed tickets: square-ish, typed, caps.
- **Shape:** die-cut corner (2px), 2px border, 44px minimum height.
- **Outline (default):** transparent on paper, press-black border and text, Courier Prime bold caps 0.875rem with 0.06em tracking, 14px side padding. Used for Copy link and each share destination.
- **Ink (native share):** pink ground and border, press-black text.
- **Hover / Focus:** hover fills with process yellow (150ms colour transition); active nudges down 1px; focus is the global 3px riso-blue ring at 3px offset.
- **Sticker (submit):** pink stock, Le Murmure at 1.875rem in riso blue multiplied over pink, 48px tall, 24px side padding, pressable sticker shadow; on hover it tips -1deg and lifts 2px (200ms ease-out). Disabled shows a progress cursor at 70% opacity.

### Cards / Containers
The system has no cards. Containers are printed objects:
- **Plaque:** plaque grey, plaque lettering, double-frame border, 14px 16px top padding (24px sides from sm) and 64px bottom padding so the sticker can cover its lower half.
- **Form panel:** paper ground, 2px press-black border, 20px padding (32px from sm), square.

### Inputs / Fields
- **Style:** underline only: 2px bottom border in press black at 60%, transparent ground, body type at 1.125rem, 8px vertical padding, no side padding. Textareas grow with content from 7rem.
- **Labels:** Courier Prime bold caps 0.75rem, 0.12em tracking, faded ink; "(optional)" drops to regular weight, sentence case.
- **Focus:** underline turns riso blue; no outline ring on the field itself.
- **Error:** underline and message in deep fuchsia; the message is linked by aria-describedby.

### Navigation
None beyond a masthead: the wordmark in Le Murmure left, the date in Courier Prime caps (0.8125rem, 0.08em tracking, faded ink) right, then a two-pass rule (6px yellow band, 2px blue line multiplied over it, shifted 3px right). A skip link appears on focus as a yellow chip in Courier.

### Sticker (signature)
The hook on pink stock with the ink-grain blended in, rotated -2deg, pulled up 48px over the plaque. The hook is printed twice: a yellow ghost (multiply, offset 3px/2px) and the blue pass (multiply) on top, which together print a deep overprint over pink. On the first entry only it slaps on at load: scale 1.14 and -6deg settling through 0.985 to 1 and -2deg over 520ms, while the yellow pass slides from 10px/6px into its 3px/2px offset over 620ms, both on the slap easing (cubic-bezier(0.16, 1, 0.3, 1)). Reduced motion shows it already placed.

### Museum Label (signature)
Her name in headline Le Murmure, the role in body below, then a Courier Prime definition list with ruled fields: hairline above, hairline under each row; on wider screens a 5.5rem label column (BORN, DIED) beside the values. Date notes and captions follow in 0.8125rem faded ink.

### Riso Portrait (signature)
A 4:5 crop of a real, openly licensed photo printed as two halftone passes: pink as a coarser midtone screen (7px cell; 4px below 768px), blue multiplied on top as a finer shadow screen (5px; 3px below 768px), the pink pass shifted 2px/1.5px. With no usable image, the name is set in Le Murmure caps sized to fill the frame, printed pink, then blue multiplied over it offset -0.05em/-0.035em. Never a blank or placeholder.

### Stamp (signature)
Rubber-stamp state marks: Courier Prime bold caps 0.9375rem, 0.08em tracking, 2.5px border plus a 2px-offset outline in the same ink, 3px corner, multiplied into the paper and worn by an SVG noise filter that knocks ink out unevenly. Default ink is deep blue; deep fuchsia marks warnings. Each stamp is tilted (-6 to +3deg).

### Source Mark
Superscript Courier Prime bold numerals in deep blue at 0.75em, tight to the word they cite; yellow on hover. The targeted source in the list gets a yellow highlighter band.

## Do's and Don'ts

### Do:
- **Do** print colour as ink: pink, blue and yellow only, overlapping with multiply and offset 2-3px out of register.
- **Do** put the official record on plaque grey and overrule it with a pink sticker rotated -2deg, pulled up over the plaque's lower half.
- **Do** set every checkable fact (dates, places, sources, credits) in Courier Prime with hairline rules.
- **Do** keep the bio at 1.125rem / 1.65 in Atkinson Hyperlegible, 65ch max, on the paper's own grain only.
- **Do** render every photo as the two-ink halftone, and print the name in two inks when there is no photo.
- **Do** carry state with a tilted, worn rubber stamp in deep blue or deep fuchsia.
- **Do** use deep pink and deep blue for any small text in colour; fluorescent pink and blue stay grounds and marks.
- **Do** separate sections with a 2px press-black rule and generous print-like space (96px).

### Don't:
- **Don't** add a dark theme; the world is light paper only.
- **Don't** use Le Murmure for body text, labels or fields.
- **Don't** put texture, ink solids or colour behind the reading column.
- **Don't** show a raw photo, an AI-generated image, a mascot or a cute doodle.
- **Don't** use cream paper with a serif, or terracotta.
- **Don't** introduce cards, rounded containers or interface shadows; only pasted stock lifts.
- **Don't** set anything that speaks for her on plaque grey.
