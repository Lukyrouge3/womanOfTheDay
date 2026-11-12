<script lang="ts">
	import DayPage from '#lib/components/DayPage.svelte';
	import { MONTHS } from '#lib/types.ts';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const e = $derived(data.entry);
	const mm = $derived(String(e.month).padStart(2, '0'));
	const dd = $derived(String(e.day).padStart(2, '0'));
</script>

<DayPage
	entries={[e]}
	{form}
	dateIso="--{mm}-{dd}"
	dateLabel="{e.day} {MONTHS[e.month - 1]}"
	permalink
/>
