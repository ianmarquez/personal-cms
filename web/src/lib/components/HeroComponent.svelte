<script lang="ts">
	import clsx from 'clsx';
	import { animate, stagger } from 'motion';
	import { AsciiArtHeader } from '$lib/components';

	function animateTechUsed(element: HTMLSpanElement) {
		if (element.children.length === 0) return;
		animate(
			[...element.children],
			{ opacity: [0, 1], y: [10, 0] },
			{ duration: 0.2, delay: stagger(0.2) }
		);
	}

	function animateContact(element: HTMLSpanElement) {
		if (element.children.length === 0) return;
		animate(
			[...element.children],
			{ opacity: [0, 1], y: [10, 0] },
			{ duration: 0.5, delay: stagger(0.5) }
		);
	}
	const contacts: Array<{ icon: string; url: string; text: string }> = [
		{
			icon: 'bi:telephone-fill',
			url: 'tel:6593928822',
			text: '+65-9392-8822'
		},
		{
			icon: 'bi:envelope-fill',
			url: 'mailto:regilmarquez123@gmail.com',
			text: 'regilmarquez123@gmail.com'
		},
		{
			icon: 'bi:linkedin',
			url: 'https://www.linkedin.com/in/ian-marquez-99930780/',
			text: 'ian-marquez-99930780'
		},
		{
			icon: 'bi:github',
			url: 'https://github.com/ianmarquez',
			text: 'ianmarquez'
		}
	];

	const techUsed: Array<{ icon: string; toolTip: string }> = [
		{
			icon: 'skill-icons:neovim-light',
			toolTip: 'Neovim'
		},
		{
			icon: 'skill-icons:svelte',
			toolTip: 'Svelte and SvelteKit'
		},
		{
			icon: 'skill-icons:nodejs-light',
			toolTip: 'NodeJS'
		},
		{
			icon: 'skill-icons:javascript',
			toolTip: 'JavaScript'
		},
		{
			icon: 'skill-icons:typescript',
			toolTip: 'Typescript'
		},
		{
			icon: 'skill-icons:react-light',
			toolTip: 'React'
		},
		{
			icon: 'skill-icons:nextjs-dark',
			toolTip: 'NextJS'
		},
		{
			icon: 'skill-icons:tailwindcss-light',
			toolTip: 'TailwindCSS'
		}
	];
</script>

<div
	class="relative border-8 border-white rounded-lg shadow-lg w-full shadow-primary overflow-hidden p-6"
>
	<div class="hero aspect-video h-fit flex flex-row">
		<div class="hero-content text-neutral-content p-0">
			<div class="w-full flex flex-col gap-2 sm:gap-5">
				<p class="text-primary text-lg sm:text-xl lg:text-2xl">Hi my name is</p>
				<AsciiArtHeader />
				<p class={'text-2xl sm:text-4xl lg:text-7xl text-secondary text-wrap'}>
					I build <span class="text-primary font-semibold">"stuff"</span> for the web.
				</p>
				<p class="max-w-lg text-sm sm:text-md lg:text-lg">
					I'm a software engineer with 10+ years of industry experience. Feel free to reach out to
					me through the channels below.
				</p>
				<section use:animateTechUsed class="flex flex-row gap-4 text-2xl">
					{#each techUsed as tech}
						<div class="tooltip tooltip-primary" data-tip={tech.toolTip}>
							<iconify-icon icon={tech.icon} />
						</div>
					{/each}
				</section>
				<section
					use:animateContact
					class={clsx(
						'flex flex-col justrify-center gap-4',
						'[&>a]:flex [&>a]:flex-row [&>a]:items-center [&>a]:gap-2 [&>a]:w-fit [&>a]:duration-300',
						'text-sm sm:text-md lg:text-lg'
					)}
				>
					{#each contacts as contact}
						<a href={contact.url} target="_blank" class="link hover:text-primary">
							<iconify-icon icon={contact.icon} />
							{contact.text}
						</a>
					{/each}
				</section>
			</div>
		</div>
	</div>
</div>
