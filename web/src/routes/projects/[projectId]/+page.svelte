<script lang="ts">
	import { getImageUrl } from '$lib/utils';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="text-md breadcrumbs">
	<ul class="[&>li>a]:duration-300">
		<li><a href="/" class="hover:text-primary">Home</a></li>
		{#if data.user}
			<li><a href="/my/projects" class="hover:text-primary">My Projects</a></li>
		{/if}
		<li><a href={$page.url.href} class="hover:text-primary">{data.project.name}</a></li>
	</ul>
</div>
<div class="flex flex-col w-full mt-4">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={data.project.thumbnail
					? getImageUrl(data.project.collectionId, data.project.id, data.project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506cb/FFFFFF/?text=${data.project.name}`}
				alt="thumbnail"
			/>
		</div>
	</div>
	<h1 class="text-2xl font-bold mt-4">
		{data.project.name}
	</h1>
	<p>{data.project.description}</p>
</div>
