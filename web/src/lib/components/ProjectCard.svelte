<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import { Modal } from '$lib/components';
	import type { ProjectsResponse } from '$lib/types/pocketbase-types';
	import { getImageUrl } from '$lib/utils';

	export let project: ProjectsResponse;
	export let loggedIn: boolean = false;

	let modalOpen = false;
	let loading = false;
	$: modalOpen;
	$: loading;

	const deleteProject: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Project deleted successfully');
				await update();
			} else if (result.type === 'error') {
				toast.error('Could not delete project. Try again later');
			} else {
				await update();
			}
			loading = false;
		};
	};
</script>

<div class="card sm:card-side bg-base-200 hover:bg-base-100 duration-300 shadow-sm w-full">
	<figure class="flex-shrink-0">
		<img
			class="aspect-video w-full sm:w-[250px] sm:h-full"
			src={project.thumbnail
				? getImageUrl(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/500/4506cb/FFFFFF/?text=${project.name}`}
			alt="thumbnail"
		/>
	</figure>
	<div class="card-body flex flex-col gap-5">
		<h2 class="card-title text-primary text-md sm:text-lg lg:text-xl font-semibold">
			{project.name}
		</h2>
		<p class="text-secondary text-sm sm:text-md lg:text-lg font-extralight">{project.tagline}</p>
		<p class="text-gray-50 text-sm sm:text-md lg:text-lg font-thin">{project.description}</p>
		<div class="card-actions justify-end">
			<a href="/projects/{project.id}" class="btn btn-primary">View</a>
			{#if loggedIn}
				<a href="/projects/{project.id}/edit" class="btn btn-outline">Edit</a>
				<Modal label={project.id} checked={modalOpen}>
					<span slot="trigger" class="btn btn-error">Delete</span>
					<div slot="heading">
						<h3 class="text-2xl">Delete {project.name}</h3>
						<p class="text-base font-normal mt-2">
							Are you sure you want to delete this project? Once deleted, the project cannot be
							restored.
						</p>
					</div>
					<div slot="actions" class="flex w-full items-center justify-center space-x-2">
						<label for={project.id} class="btn btn-outline">Cancel</label>
						<form action="?/deleteProject" method="POST" use:enhance={deleteProject}>
							<input type="hidden" name="id" value={project.id} />
							<button class="btn btn-error">Delete</button>
						</form>
					</div>
				</Modal>
			{/if}
		</div>
	</div>
</div>
