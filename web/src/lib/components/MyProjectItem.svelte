<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ProjectsResponse } from '$lib/types/pocketbase-types';
	import { getImageUrl } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Modal } from '.';
	import toast from 'svelte-french-toast';

	let modalOpen = false;
	let loading = false;
	$: modalOpen;
	$: loading;
	export let project: ProjectsResponse;

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

<div class="w-full h-28 flex items-center justify-between">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src="{project.thumbnail
					? getImageUrl(project.collectionId, project.id, project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506cb/FFFFFF/?text=${project.name}`}project"
				alt="thumbnail"
			/>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
		<p>{project.tagline}</p>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/projects/{project.id}/edit" class="btn btn-outline">Edit Project</a>
		<Modal label={project.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
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
	</div>
</div>
