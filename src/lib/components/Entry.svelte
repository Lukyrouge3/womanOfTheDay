<script lang="ts">
	import { DATE_TYPE_VERB, MONTHS, type Entry } from '#lib/types.ts';
	import RisoPortrait from './RisoPortrait.svelte';
	import Stamp from './Stamp.svelte';
	import ShareRow from './ShareRow.svelte';

	let {
		entry,
		first = false,
		shareUrl
	}: { entry: Entry; first?: boolean; shareUrl: string } = $props();

	const shortDate = $derived(`${entry.day} ${MONTHS[entry.month - 1].slice(0, 3)}`);
	const headingId = $derived(`${entry.slug}-name`);
	// Keep the source mark glued to the record's last word.
	const recordHead = $derived(entry.officialRecord?.replace(/\S+$/, '') ?? '');
	const recordTail = $derived(entry.officialRecord?.match(/\S+$/)?.[0] ?? '');
	// When her birth date is unknown, say which date we use instead.
	const stampText = $derived(
		entry.dateType !== 'birth'
			? [`${DATE_TYPE_VERB[entry.dateType]} ${shortDate}`, 'Birth date unknown']
			: null
	);
	const year = (s?: string) => s?.match(/\b\d{3,4}\b/)?.[0];
	const lifespan = $derived(
		[year(entry.born), year(entry.died)].some(Boolean)
			? `${year(entry.born) ?? '?'}–${year(entry.died) ?? ''}`
			: null
	);
</script>

<article aria-labelledby={headingId} class="scroll-mt-6">
	<!-- The official record, and the sticker pasted over it. -->
	<header class="relative max-w-[50rem]">
		{#if entry.officialRecord}
			<div
				class="plaque relative border border-plaque-ink/45 bg-plaque px-4 pt-3.5 pb-16 font-body text-[0.8125rem] leading-snug font-bold tracking-[0.07em] text-plaque-ink uppercase sm:px-6 sm:text-sm"
			>
				<p class="max-w-[52ch]">
					{recordHead}<span class="whitespace-nowrap"
						>{recordTail}{#if entry.officialRecordSource}<sup class="src-mark"
								><a href="#{entry.slug}-src-{entry.officialRecordSource}"
									aria-label="Source {entry.officialRecordSource}">{entry.officialRecordSource}</a
								></sup
							>{/if}</span
					>
				</p>
			</div>
		{/if}

		<div
			class={[
				'sticker relative z-10 mx-1 bg-pink px-4 py-4 sm:mx-6 sm:px-6 sm:py-5',
				entry.officialRecord ? '-mt-12' : 'mt-2',
				first && 'slap'
			]}
		>
			<span
				aria-hidden="true"
				class="ghost absolute inset-x-4 top-4 font-display text-[clamp(2.6rem,10.5vw,5.25rem)] leading-[0.92] text-balance text-yellow mix-blend-multiply sm:inset-x-6 sm:top-5"
				>{entry.hook}</span
			>
			<p
				class="hook relative font-display text-[clamp(2.6rem,10.5vw,5.25rem)] leading-[0.92] text-balance text-overprint"
			>
				{entry.hook}
			</p>
		</div>
	</header>

	<!-- Name + portrait -->
	<div
		class="mt-8 grid grid-cols-[minmax(0,1fr)_9.5rem] gap-x-4 gap-y-5 [grid-template-areas:'name_photo'_'cap_cap'_'bio_bio'] sm:mt-10 sm:grid-cols-[minmax(0,1fr)_13rem] sm:[grid-template-areas:'name_photo'_'bio_photo'] md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:grid-rows-[auto_1fr] md:gap-x-10"
	>
		<div class="self-center [grid-area:name] sm:self-start">
			<h2
				id={headingId}
				class="font-display text-[clamp(2.4rem,9vw,3.75rem)] leading-[0.95] text-balance text-ink"
			>
				{entry.name}
			</h2>
			{#if entry.role}
				<p class="mt-2 font-body text-lg leading-snug text-ink-soft">{entry.role}</p>
			{/if}
			{#if lifespan}
				<p class="mt-1 font-detail text-[0.9375rem] text-ink-soft">{lifespan}</p>
			{/if}
			{#if stampText}
				<div class="mt-4">
					<Stamp tilt={-4}
						>{stampText[0].replaceAll(' ', '\u00a0')}<br />{stampText[1].replaceAll(' ', '\u00a0')}</Stamp
					>
				</div>
			{/if}
		</div>

		{#if entry.image?.caption}
			<!-- On phones the portrait is narrow, so its caption runs full width here. -->
			<p class="font-detail text-[0.8125rem] leading-snug text-ink-soft [grid-area:cap] sm:hidden">
				{entry.image.caption}
				{#if entry.image.sourceUrl}
					<a
						href={entry.image.sourceUrl}
						class="underline decoration-pink decoration-2 underline-offset-2 hover:text-ink"
						>See the original</a
					>
				{/if}
			</p>
		{/if}

		<figure class="[grid-area:photo]">
			<RisoPortrait image={entry.image} name={entry.name} eager={first} />
			{#if entry.image}
				<figcaption class="mt-2 hidden font-detail text-[0.8125rem] leading-snug text-ink-soft sm:block">
					{#if entry.image.caption}{entry.image.caption}{/if}
					{#if entry.image.sourceUrl}
						<a
							href={entry.image.sourceUrl}
							class="underline decoration-pink decoration-2 underline-offset-2 hover:text-ink"
							>See the original</a
						>
					{/if}
				</figcaption>
			{/if}
		</figure>

		<!-- The bio: calm reading column -->
		<div class="prose-bio mt-3 [grid-area:bio] md:mt-4">
			{@html entry.bioHtml}
		</div>
	</div>

	<!-- Sources & further reading -->
	<section aria-labelledby="{entry.slug}-sources" class="mt-12 max-w-[65ch] border-t-2 border-ink pt-6">
		{#if entry.born || entry.died}
			<dl
				class="mb-10 grid grid-cols-[5.5rem_1fr] border-t border-ink/25 font-detail text-[0.9375rem] leading-snug"
			>
				{#if entry.born}
					<dt class="border-b border-ink/25 py-2 text-xs tracking-[0.1em] text-ink-soft uppercase">Born</dt>
					<dd class="border-b border-ink/25 py-2">{entry.born}</dd>
				{/if}
				{#if entry.died}
					<dt class="border-b border-ink/25 py-2 text-xs tracking-[0.1em] text-ink-soft uppercase">Died</dt>
					<dd class="border-b border-ink/25 py-2">{entry.died}</dd>
				{/if}
			</dl>
			{#if entry.dateNote}
				<p class="-mt-8 mb-10 font-detail text-[0.8125rem] leading-snug text-pretty text-ink-soft">
					{entry.dateNote}
				</p>
			{/if}
		{/if}
		<h3 id="{entry.slug}-sources" class="font-display text-3xl leading-none text-blue-deep">
			Sources
		</h3>
		<ol class="mt-4 space-y-3 font-detail text-[0.9375rem] leading-snug">
			{#each entry.sources as src, i (i)}
				<li id="{entry.slug}-src-{i + 1}" class="source grid grid-cols-[2rem_1fr] scroll-mt-6">
					<span class="font-bold text-blue-deep">{i + 1}</span>
					<span>
						{#if src.url}
							<a
								href={src.url}
								class="underline decoration-pink decoration-2 underline-offset-[3px] hover:bg-yellow"
								>{src.title}</a
							>
						{:else}
							{src.title}
						{/if}
					</span>
				</li>
			{/each}
		</ol>

		{#if entry.furtherReading.length}
			<h3 class="mt-8 font-display text-2xl leading-none text-blue-deep">Further reading</h3>
			<ul class="mt-3 list-[square] space-y-2 pl-5 font-detail text-[0.9375rem] leading-snug marker:text-blue">
				{#each entry.furtherReading as src, i (i)}
					<li>
						{#if src.url}
							<a
								href={src.url}
								class="underline decoration-pink decoration-2 underline-offset-[3px] hover:bg-yellow"
								>{src.title}</a
							>
						{:else}
							<span>{src.title}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}

		{#if entry.image && (entry.image.credit || entry.image.license)}
			<p class="mt-8 font-detail text-[0.8125rem] leading-snug text-ink-soft">
				<span class="tracking-[0.1em] uppercase">Image</span>
				{[entry.image.credit, entry.image.license].filter(Boolean).join(' · ')}{#if entry.image.sourceUrl}
					· <a
						href={entry.image.sourceUrl}
						class="underline decoration-pink decoration-2 underline-offset-2 hover:text-ink"
						>Wikimedia Commons</a
					>{/if}. Printed here as a two-ink halftone.
			</p>
		{/if}
	</section>

	<ShareRow name={entry.name} hook={entry.hook} url={shareUrl} />
</article>

<style>
	.sticker {
		rotate: -2deg;
		/* A sticker lifts off the plaque a little: offset, soft. */
		box-shadow:
			0 10px 18px -10px rgb(29 29 27 / 0.45),
			0 2px 3px -1px rgb(29 29 27 / 0.2);
	}
	.plaque::before {
		content: '';
		position: absolute;
		inset: 4px;
		border: 1px solid rgb(72 71 63 / 0.3);
		pointer-events: none;
	}

	/* Riso solids are never flat: paper fibre shows through the ink. */
	.sticker {
		background-image: var(--grain-ink);
		background-blend-mode: multiply;
	}
	.ghost {
		translate: 3px 2px;
	}
	.slap {
		animation: slap 520ms var(--ease-slap) both;
	}
	/* The yellow pass lands off-register and settles. */
	.slap .ghost {
		animation: register 620ms var(--ease-slap) both;
	}
	@keyframes register {
		from {
			translate: 10px 6px;
		}
		to {
			translate: 3px 2px;
		}
	}
	@keyframes slap {
		0% {
			scale: 1.14;
			rotate: -6deg;
			box-shadow: 0 26px 30px -14px rgb(29 29 27 / 0.35);
		}
		55% {
			scale: 0.985;
			rotate: -1.6deg;
		}
		100% {
			scale: 1;
			rotate: -2deg;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.slap,
		.slap .ghost {
			animation: none;
		}
	}

	.source:target {
		background: linear-gradient(transparent 8%, var(--color-yellow) 8%, var(--color-yellow) 92%, transparent 92%);
	}
</style>
