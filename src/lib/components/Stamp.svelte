<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		tone = 'blue',
		tilt = 7,
		children
	}: { tone?: 'blue' | 'pink'; tilt?: number; children: Snippet } = $props();
</script>

<span
	class={[
		'stamp inline-block max-w-64 rounded-[3px] border-[2.5px] border-current px-2.5 pt-1.5 pb-1',
		'text-center font-detail text-[0.9375rem] leading-snug font-bold tracking-[0.08em] uppercase',
		'outline outline-offset-2 outline-current mix-blend-multiply',
		tone === 'blue' ? 'text-blue-deep' : 'text-pink-deep'
	]}
	style:rotate="{tilt}deg"
>
	{@render children()}
</span>

<style>
	/* Worn rubber: the SVG filter knocks ink out unevenly. */
	.stamp {
		filter: url(#stamp-wear);
	}
</style>
