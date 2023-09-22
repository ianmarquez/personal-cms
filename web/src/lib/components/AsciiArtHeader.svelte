<script lang="ts">
	import clsx from 'clsx';
	import { animate, stagger } from 'motion';
	const duration = 0.009;
	const asciiArt = [
		'██╗ █████╗ ███╗   ██╗    ███╗   ███╗ █████╗ ██████╗  ██████╗ ██╗   ██╗███████╗███████╗',
		'██║██╔══██╗████╗  ██║    ████╗ ████║██╔══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝╚══███╔╝',
		'██║███████║██╔██╗ ██║    ██╔████╔██║███████║██████╔╝██║   ██║██║   ██║█████╗    ███╔╝',
		'██║██╔══██║██║╚██╗██║    ██║╚██╔╝██║██╔══██║██╔══██╗██║▄▄ ██║██║   ██║██╔══╝   ███╔╝',
		'██║██║  ██║██║ ╚████║    ██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████╗███████╗',
		'╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝'
	];

	function animateAsciiArt(element: HTMLPreElement | HTMLDivElement) {
		if (element.children.length === 0) return;
		const text = element.innerText.trim().split('');
		element.innerHTML = '';

		text.forEach((char) => {
			element.innerHTML += `<span>${char}</span>`;
		});

		animate(
			[...element.children],
			{ opacity: [0, 1], x: [-10, 0] },
			{ duration, delay: stagger(duration) }
		);
	}
</script>

<div class="text-[0.40rem] md:text-[0.75rem] lg:text-xl">
	<pre
		class={clsx(
			'leading-none h-fit overflow-hidden',
			'text-transparent bg-clip-text bg-gradient-to-r to-[#FF9580] from-[#FFFF80]'
		)}
		use:animateAsciiArt>
    {#each asciiArt as line}
			<div class="leading-none">{line}</div>
		{/each}
  </pre>
</div>
