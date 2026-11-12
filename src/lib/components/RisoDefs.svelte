<script lang="ts">
	// Halftone screens for the two-ink riso portrait. Each filter turns luminance into
	// a dot screen and paints it in one spot ink, transparent where the paper shows.
	const cell = (size: number) =>
		'data:image/svg+xml,' +
		encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><radialGradient id="g" r="0.62"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient></defs><rect width="${size}" height="${size}" fill="url(#g)"/></svg>`
		);

	const inks = {
		// Shadows and detail: riso blue, a fine screen.
		blue: { size: 5, rgb: [0, 0x78 / 255, 0xbf / 255], slope: 1.35, intercept: 0.12 },
		// Broad midtones: fluorescent pink, a coarser screen.
		pink: { size: 7, rgb: [1, 0x48 / 255, 0xb0 / 255], slope: 0.9, intercept: 0.02 },
		// Finer screens for small portraits, so a face still reads at thumbnail size.
		'blue-fine': { size: 3, rgb: [0, 0x78 / 255, 0xbf / 255], slope: 1.35, intercept: 0.12 },
		'pink-fine': { size: 4, rgb: [1, 0x48 / 255, 0xb0 / 255], slope: 0.9, intercept: 0.02 }
	};
</script>

<svg width="0" height="0" aria-hidden="true" style="position:absolute">
	<defs>
		{#each Object.entries(inks) as [name, ink] (name)}
			<filter
				id="riso-{name}"
				x="0"
				y="0"
				width="100%"
				height="100%"
				color-interpolation-filters="sRGB"
			>
				<feColorMatrix
					type="matrix"
					values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0"
					result="gray"
				/>
				<feComponentTransfer in="gray" result="tone">
					<feFuncR type="linear" slope={ink.slope} intercept={ink.intercept} />
					<feFuncG type="linear" slope={ink.slope} intercept={ink.intercept} />
					<feFuncB type="linear" slope={ink.slope} intercept={ink.intercept} />
				</feComponentTransfer>
				<feImage href={cell(ink.size)} x="0" y="0" width={ink.size} height={ink.size} result="cell" />
				<feTile in="cell" result="screen" />
				<feComposite in="tone" in2="screen" operator="arithmetic" k2="0.5" k3="0.5" result="sum" />
				<feComponentTransfer in="sum" result="bw">
					<feFuncR type="discrete" tableValues="0 1" />
				</feComponentTransfer>
				<feColorMatrix
					in="bw"
					type="matrix"
					values="0 0 0 0 {ink.rgb[0]}  0 0 0 0 {ink.rgb[1]}  0 0 0 0 {ink.rgb[2]}  -1 0 0 0 1"
				/>
			</filter>
		{/each}

		<!-- Worn rubber: knocks ink out of stamps unevenly. -->
		<filter id="stamp-wear" x="-5%" y="-5%" width="110%" height="110%">
			<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
			<feColorMatrix
				in="noise"
				type="matrix"
				values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.55"
				result="holes"
			/>
			<feComposite in="SourceGraphic" in2="holes" operator="in" />
		</filter>
	</defs>
</svg>
