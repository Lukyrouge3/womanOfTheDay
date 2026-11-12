<script lang="ts">
	import { onMount } from 'svelte';
	import { siBluesky, siWhatsapp, siFacebook } from 'simple-icons';
	import Link from '@lucide/svelte/icons/link';
	import Check from '@lucide/svelte/icons/check';
	import Mail from '@lucide/svelte/icons/mail';
	import Share2 from '@lucide/svelte/icons/share-2';

	let { name, hook, url }: { name: string; hook: string; url: string } = $props();

	let canShare = $state(false);
	let copied = $state(false);
	onMount(() => {
		canShare = typeof navigator.share === 'function';
	});

	const text = $derived(`${hook} — ${name}`);
	const brands = $derived([
		{
			label: 'Share on Bluesky',
			path: siBluesky.path,
			href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text} ${url}`)}`
		},
		{
			label: 'Share on WhatsApp',
			path: siWhatsapp.path,
			href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
		},
		{
			label: 'Share on Facebook',
			path: siFacebook.path,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
		}
	]);
	const mailto = $derived(
		`mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
	);

	async function share() {
		try {
			await navigator.share({ title: name, text, url });
		} catch {
			/* share sheet closed */
		}
	}
	async function copy() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 2400);
		} catch {
			window.prompt('Copy this link:', url);
		}
	}

	const btn =
		'inline-flex size-12 items-center justify-center rounded-full border-2 border-ink text-ink transition-[background-color,rotate] duration-150 hover:-rotate-6 hover:bg-yellow active:translate-y-px';
</script>

<div class="mt-10 max-w-[65ch] border-t border-ink/25 pt-5">
	<p class="font-body text-lg font-bold">Tell someone about {name}.</p>
	<div class="mt-3 flex flex-wrap items-center gap-2.5">
		{#if canShare}
			<button
				type="button"
				class="{btn} border-pink bg-pink hover:border-yellow"
				onclick={share}
				aria-label="Share"
				title="Share"><Share2 size={20} strokeWidth={2.25} aria-hidden="true" /></button
			>
		{/if}
		<button
			type="button"
			class={btn}
			onclick={copy}
			aria-label={copied ? 'Link copied' : 'Copy link'}
			title={copied ? 'Link copied' : 'Copy link'}
		>
			{#if copied}
				<Check size={20} strokeWidth={2.5} aria-hidden="true" />
			{:else}
				<Link size={20} strokeWidth={2.25} aria-hidden="true" />
			{/if}
		</button>
		{#each brands as b (b.label)}
			<a class={btn} href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.label} title={b.label}>
				<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d={b.path} /></svg>
			</a>
		{/each}
		<a class={btn} href={mailto} aria-label="Share by email" title="Share by email">
			<Mail size={20} strokeWidth={2.25} aria-hidden="true" />
		</a>
		<span class="sr-only" aria-live="polite">{copied ? 'Link copied' : ''}</span>
	</div>
</div>
