<script lang="ts">
	import type { ProjectsResponse } from '$lib/types/pocketbase-types';
	import { getImageUrl } from '$lib/utils';

	export let project: ProjectsResponse;
</script>

<a href="/projects/{project.id}" class="overflow-clip card w-96 bg-base-100 shadow-2xl">
	<figure>
		<img
			class="aspect-video"
			src={project.thumbnail
				? getImageUrl(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/500/4506cb/FFFFFF/?text=${project.name}`}
			alt="thumbnail"
		/>
	</figure>
	<div class="card-body bg-base-200">
		<h2 class="card-title">{project.name}</h2>
		<p>{project.tagline}</p>

		<p class="text-sm text-gray-50">{project.description}</p>
		<div class="card-actions justify-end" />
	</div>
</a>
