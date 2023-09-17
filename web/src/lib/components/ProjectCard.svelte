<script lang="ts">
	import type { ProjectsResponse } from '$lib/types/pocketbase-types';
	import { getImageUrl } from '$lib/utils';

	export let project: ProjectsResponse;
</script>

<a
	href="/projects/{project.id}"
	class="card sm:card-side bg-base-200 hover:bg-base-100 duration-300 shadow-2xl w-full"
>
	<figure class="flex-shrink-0">
		<img
			class="sm:aspect-square aspect-auto w-full sm:w-[220px] h-[220px]"
			src={project.thumbnail
				? getImageUrl(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/500/4506cb/FFFFFF/?text=${project.name}`}
			alt="thumbnail"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title text-primary text-md sm:text-lg lg:text-xl font-semibold">
			{project.name}
		</h2>
		<p class="text-secondary text-sm sm:text-md lg:text-lg font-extralight">{project.tagline}</p>
		<p class="text-gray-50 text-sm sm:text-md lg:text-lg font-thin">{project.description}</p>
	</div>
</a>
