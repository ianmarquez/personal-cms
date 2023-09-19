<script lang="ts">
	import { ProjectCard } from '$lib/components';
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

<div class="text-md breadcrumbs">
	<ul class="[&>li>a]:duration-300">
		<li><a href="/" class="hover:text-primary">Home</a></li>
		<li><a href="/my/projects" class="hover:text-primary">My Projects</a></li>
	</ul>
</div>
<h2 class="text-3xl font-bold">My Projects</h2>
<div use:animateProjectCards class="w-full mt-4 flex flex-col items-center gap-5">
	{#if data.projects.length === 0}
		<p class="text-center text-3xl">Looks like you dont have any projects.</p>
		<a href="/projects/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.projects as project}
			<ProjectCard {project} loggedIn={!!data.user} />
		{/each}
	{/if}
</div>
