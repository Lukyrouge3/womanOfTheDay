<script lang="ts">
	import type { EntryImage } from '#lib/types.ts';

	let { image, name }: { image?: EntryImage; name: string } = $props();
	let failed = $state(false);
	// Size the all-type name so its longest word fills the slot (Le Murmure caps ≈ 0.4em wide).
	const fit = $derived(
		Math.min(34, 92 / (0.4 * Math.min(10, Math.max(...name.split(/[\s-]+/).map((w) => w.length)))))
	);
</script>

{#if image && !failed}
	<!-- Two passes of the same real photo, each screened in one ink and overprinted slightly off register. -->
	<div class="relative isolate aspect-[4/5] overflow-hidden" role="img" aria-label={image.alt}>
		<img
			src={image.src}
			alt=""
			class="ink-pink block h-full w-full translate-x-[2px] translate-y-[1.5px] scale-[1.01] object-cover"
			loading="lazy"
			decoding="async"
			onerror={() => (failed = true)}
		/>
		<img
			src={image.src}
			alt=""
			class="ink-blue absolute inset-0 block h-full w-full object-cover mix-blend-multiply"
			loading="lazy"
			decoding="async"
		/>
	</div>
{:else}
	<!-- No usable image: the name itself, printed twice in two inks. -->
	<div
		class="relative isolate flex aspect-[4/5] items-end p-2.5 [container-type:inline-size]"
		style:--fit={fit}
		aria-hidden="true"
	>
		<div class="relative w-full">
			<span
				class="block font-display text-[calc(var(--fit)*1cqi)] leading-[0.9] text-pink uppercase wrap-anywhere"
				>{name}</span
			>
			<!-- The blue pass overprints the pink, a hair off register. -->
			<span
				class="absolute inset-0 -translate-x-[0.05em] -translate-y-[0.035em] font-display text-[calc(var(--fit)*1cqi)] leading-[0.9] text-blue uppercase wrap-anywhere mix-blend-multiply"
				>{name}</span
			>
		</div>
	</div>
{/if}

<style>
	.ink-pink {
		filter: url(#riso-pink-fine);
	}
	.ink-blue {
		filter: url(#riso-blue-fine);
	}
	@media (min-width: 48rem) {
		.ink-pink {
			filter: url(#riso-pink);
		}
		.ink-blue {
			filter: url(#riso-blue);
		}
	}
</style>
