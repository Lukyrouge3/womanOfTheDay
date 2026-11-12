<script lang="ts">
	import { page } from '$app/state';
	import Entry from './Entry.svelte';
	import RisoDefs from './RisoDefs.svelte';
	import SuggestForm from './SuggestForm.svelte';
	import { PORTRAIT_SIZES, portraitSrc, portraitSrcset, type Entry as EntryT } from '#lib/types.ts';

	type FormState = { sent?: boolean; errors?: Record<string, string>; values?: Record<string, string> } | null | undefined;

	let {
		entries,
		form,
		dateIso,
		dateLabel,
		permalink = false
	}: {
		entries: EntryT[];
		form: FormState;
		/** Machine date for the masthead's <time>. */
		dateIso: string;
		dateLabel: string;
		/** True on a woman's own page: adds a way back to today. */
		permalink?: boolean;
	} = $props();

	const lead = $derived(entries[0]);
	const linkFor = (e: EntryT) => `${page.url.origin}/${e.slug}`;
	const pageUrl = $derived(permalink && lead ? linkFor(lead) : page.url.origin + '/');
	const title = $derived(
		lead ? `${lead.hook} — ${lead.name} · Woman of the Day` : 'Woman of the Day'
	);
	const description = $derived(
		lead
			? `${lead.name}${lead.role ? `, ${lead.role.toLowerCase()}` : ''}. ${lead.officialRecord ?? ''}`.trim()
			: 'Every day, a woman history overlooked.'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Woman of the Day" />
	<meta property="og:title" content={lead ? `${lead.hook} — ${lead.name}` : 'Woman of the Day'} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl} />
	{#if lead}
		<meta property="og:image" content="{page.url.origin}/og/{lead.slug}.png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content="{lead.hook} — {lead.name}" />
	{/if}
	{#if lead?.image}
		<!-- The first portrait is the biggest thing on screen: fetch it before the browser finds the <img>. -->
		<link
			rel="preload"
			as="image"
			href={portraitSrc(lead.image.src)}
			imagesrcset={portraitSrcset(lead.image.src)}
			imagesizes={PORTRAIT_SIZES}
			fetchpriority="high"
		/>
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="theme-color" content="#f3f1ec" />
</svelte:head>

<RisoDefs />

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-yellow focus:px-4 focus:py-2 focus:font-detail"
	>Skip to the story</a
>

<div class="mx-auto max-w-[72rem] px-4 sm:px-8 lg:px-12">
	<!-- Masthead -->
	<header class="pt-5 sm:pt-8">
		<div class="flex items-baseline justify-between gap-4">
			<h1 class="font-display text-[1.65rem] leading-none sm:text-4xl">Woman of the Day</h1>
			<p class="text-right font-detail text-[0.8125rem] tracking-[0.08em] text-ink-soft uppercase sm:text-sm">
				<time datetime={dateIso}>{dateLabel}</time>
			</p>
		</div>
		<!-- Two rules printed in two passes, a hair out of register -->
		<div class="relative mt-3 h-2" aria-hidden="true">
			<div class="absolute inset-x-0 top-0 h-1.5 bg-yellow"></div>
			<div class="absolute inset-x-0 top-[5px] h-[2px] translate-x-[3px] bg-blue mix-blend-multiply"></div>
		</div>
		<p class="mt-3 font-detail text-sm leading-snug text-ink-soft">
			Women get overlooked every single day. Let’s talk about them.
		</p>
	</header>

	<main id="main" class="pb-16">
		{#if permalink}
			<p class="mt-6 font-detail text-sm">
				<a
					href="/"
					class="underline decoration-pink decoration-2 underline-offset-[3px] hover:bg-yellow"
					>See today’s woman</a
				>
			</p>
		{/if}
		{#if entries.length}
			{#each entries as entry, i (entry.slug)}
				<div class={i === 0 ? 'mt-8 sm:mt-12' : 'mt-24 border-t-2 border-ink pt-16'}>
					<Entry {entry} first={i === 0} shareUrl={linkFor(entry)} />
				</div>
			{/each}
		{:else}
			<div class="mt-16 max-w-[50ch]">
				<p class="font-display text-5xl leading-none">The first story is on its way.</p>
				<p class="mt-4 text-lg leading-relaxed">
					We publish only what has been researched and checked. Until the first entry is ready, you
					can tell us who belongs here.
				</p>
			</div>
		{/if}

		<div class="mt-24 border-t-2 border-ink pt-12">
			<SuggestForm {form} />
		</div>
	</main>

	<footer class="border-t-2 border-ink pt-10 pb-12">
		<div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
			<div>
				<h2 class="font-display text-4xl leading-none">Why this exists</h2>
				<p class="mt-4 max-w-[52ch] text-lg leading-relaxed">
					History is full of men who got the prize, the patent, the name on the paper. Again and
					again, a woman did the work and was written out. Every day, we put one of them back on the
					record.
				</p>
			</div>
			<div class="md:pt-14">
				<p class="max-w-[52ch] leading-relaxed text-ink-soft">
					Every story is checked against its sources by a person before it goes up. We can still get
					things wrong. If you spot a mistake,
					<a
						href="#suggest"
						class="font-bold text-ink underline decoration-pink decoration-2 underline-offset-[3px] hover:bg-yellow"
						>tell us</a
					> and we’ll fix it.
				</p>
				<p class="mt-4 max-w-[52ch] font-detail text-[0.8125rem] leading-snug text-ink-soft">
					Photos are real and openly licensed, credited under each story.
				</p>
			</div>
		</div>
	</footer>
</div>
