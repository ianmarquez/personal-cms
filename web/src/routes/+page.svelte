<script lang="ts">
	import { ProjectCard, HeroComponent } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col items-center justify-center gap-5 snap-y">
	<HeroComponent />
	<div class="flex flex-col gap-3 min-h-screen snap-start">
		<h1 class="text-2xl font-bold">Recent Projects</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each data.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</div>
