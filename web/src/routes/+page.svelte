<script lang="ts">
	import { ProjectCard, HeroComponent } from '$lib/components';
	import { animate, stagger } from 'motion';
	export let data;

	function animateProjectCards(element: HTMLDivElement) {
		if (element.children.length === 0) return;
		animate(
			[...element.children],
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.5, delay: stagger(0.5) }
		);
	}
</script>

<div class="flex flex-col items-center justify-center gap-10 snap-y">
	<HeroComponent />
	<div class="flex flex-col gap-3 min-h-screen snap-start w-full">
		{#if data.projects.length > 0}
			<h1 class="text-2xl font-bold">Recent Undertakings</h1>
			<div use:animateProjectCards class="flex flex-col gap-5 items-center justify-center w-full">
				{#each data.projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		{/if}
	</div>
</div>
