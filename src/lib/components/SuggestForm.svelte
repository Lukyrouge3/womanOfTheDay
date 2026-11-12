<script lang="ts">
	import { enhance } from '$app/forms';
	import Stamp from './Stamp.svelte';

	type FormState =
		| { sent?: boolean; errors?: Record<string, string>; values?: Record<string, string> }
		| null
		| undefined;

	let { form }: { form: FormState } = $props();
	let sending = $state(false);

	const field =
		'mt-1 block w-full border-0 border-b-2 border-ink/60 bg-transparent px-0 py-2 font-body text-lg text-ink placeholder:text-ink-soft/80 focus:border-blue focus:ring-0 focus:outline-none aria-[invalid=true]:border-pink-deep';
	const label = 'block font-detail text-xs font-bold tracking-[0.12em] text-ink-soft uppercase';
</script>

<section id="suggest" aria-labelledby="suggest-title" class="scroll-mt-6">
	<h2 id="suggest-title" class="font-display text-[clamp(2.4rem,8vw,3.5rem)] leading-none">
		Suggest a woman
	</h2>
	<p class="mt-3 max-w-[52ch] text-lg leading-relaxed">
		Know someone history wrote out? Tell us who she was and where to read about her. Spotted a
		mistake in a story? Tell us here too.
	</p>

	{#if form?.sent}
		<div class="mt-8 flex flex-wrap items-center gap-5 border-2 border-ink bg-paper p-6" role="status">
			<Stamp tilt={-6}>Received</Stamp>
			<p class="max-w-[40ch] text-lg">Thank you. She’s on our list to research.</p>
		</div>
	{:else}
		<form
			method="POST"
			action="?/suggest"
			class="mt-8 max-w-[40rem] border-2 border-ink bg-paper p-5 sm:p-8"
			use:enhance={() => {
				sending = true;
				return async ({ update }) => {
					await update({ reset: false });
					sending = false;
				};
			}}
		>
			<div class="grid gap-6">
				<div>
					<label class={label} for="s-name">Her name</label>
					<input
						id="s-name"
						name="name"
						class={field}
						autocomplete="off"
						required
						maxlength="200"
						value={form?.values?.name ?? ''}
						aria-invalid={form?.errors?.name ? 'true' : undefined}
						aria-describedby={form?.errors?.name ? 's-name-err' : undefined}
					/>
					{#if form?.errors?.name}<p id="s-name-err" class="mt-1.5 text-pink-deep">{form.errors.name}</p>{/if}
				</div>
				<div>
					<label class={label} for="s-reason">What did she do, and who got the credit?</label>
					<textarea
						id="s-reason"
						name="reason"
						rows="4"
						class="{field} resize-none [field-sizing:content] min-h-28"
						required
						maxlength="4000"
						aria-invalid={form?.errors?.reason ? 'true' : undefined}
						aria-describedby={form?.errors?.reason ? 's-reason-err' : undefined}
						>{form?.values?.reason ?? ''}</textarea
					>
					{#if form?.errors?.reason}<p id="s-reason-err" class="mt-1.5 text-pink-deep">{form.errors.reason}</p>{/if}
				</div>
				<div class="grid gap-6 sm:grid-cols-2">
					<div>
						<label class={label} for="s-source">A source <span class="font-normal normal-case tracking-normal">(optional)</span></label>
						<input id="s-source" name="source" class={field} inputmode="url" placeholder="Link or book" maxlength="500" value={form?.values?.source ?? ''} />
					</div>
					<div>
						<label class={label} for="s-contact">Your email <span class="font-normal normal-case tracking-normal">(optional)</span></label>
						<input id="s-contact" name="contact" type="email" class={field} autocomplete="email" maxlength="200" value={form?.values?.contact ?? ''} />
					</div>
				</div>
				<!-- Honeypot for bots; hidden from people and screen readers. -->
				<div class="absolute -left-[9999px]" aria-hidden="true">
					<label>Website <input name="website" tabindex="-1" autocomplete="off" /></label>
				</div>
			</div>

			{#if form?.errors?.form}
				<p class="mt-6 text-pink-deep" role="alert">{form.errors.form}</p>
			{/if}

			<button
				type="submit"
				disabled={sending}
				class="mt-8 inline-flex min-h-12 items-center bg-pink px-6 font-display text-3xl leading-none text-overprint shadow-[0_8px_14px_-8px_rgb(29_29_27/0.5)] transition-[rotate,translate] duration-200 ease-out hover:-rotate-1 hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-70"
			>
				<span>{sending ? 'Sending…' : 'Send suggestion'}</span>
			</button>
		</form>
	{/if}
</section>
