<script lang="ts">
	import DayPage from '#lib/components/DayPage.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const dateLabel = $derived(
		new Date(`${data.today.iso}T12:00:00Z`).toLocaleDateString('en-GB', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			timeZone: 'UTC'
		})
	);
</script>

<DayPage entries={data.today.entries} {form} dateIso={data.today.iso} {dateLabel} />
