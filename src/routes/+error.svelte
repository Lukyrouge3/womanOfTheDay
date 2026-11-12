<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Not found · Woman of the Day</title>
</svelte:head>

<div class="mx-auto max-w-[72rem] px-4 pt-5 pb-24 sm:px-8 sm:pt-8 lg:px-12">
	<p class="font-display text-[1.65rem] leading-none sm:text-4xl">
		<a href="/">Woman of the Day</a>
	</p>
	<div class="relative mt-3 h-2" aria-hidden="true">
		<div class="absolute inset-x-0 top-0 h-1.5 bg-yellow"></div>
		<div class="absolute inset-x-0 top-[5px] h-[2px] translate-x-[3px] bg-blue mix-blend-multiply"></div>
	</div>

	<h1 class="mt-16 max-w-[16ch] font-display text-[clamp(2.6rem,10vw,4.5rem)] leading-[0.95]">
		{page.status === 404 ? 'This page isn’t on the record.' : 'Something went wrong on our side.'}
	</h1>
	<p class="mt-5 max-w-[48ch] text-lg leading-relaxed">
		{page.status === 404
			? 'The link may be mistyped, or the story may have been taken down for a correction.'
			: 'Please try again in a minute.'}
	</p>
	<p class="mt-8 font-detail text-sm">
		<a href="/" class="underline decoration-pink decoration-2 underline-offset-[3px] hover:bg-yellow"
			>See today’s woman</a
		>
	</p>
</div>
