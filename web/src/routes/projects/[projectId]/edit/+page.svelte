<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal, TextArea } from '$lib/components';
	import { getImageUrl } from '$lib/utils.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Icon, Trash } from 'svelte-hero-icons';

	export let data;
	export let form;

	let modalOpen: boolean = false;
	$: modalOpen;

	let loading: boolean = false;

	const submitUpdateProject: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				await invalidateAll();
			} else if (result.type === 'error') {
			} else {
				await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/updateProject"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateProject}
		>
			<h3 class="text-3xl font-bold">Edit {data.project.name}</h3>
			<Input
				label="Project name"
				type="text"
				id="name"
				value={form?.data?.name || data.project.name}
				errors={form?.errors?.name || []}
			/>
			<Input
				label="Project Tagline"
				type="text"
				id="tagline"
				value={form?.data?.tagline || data.project.tagline}
				errors={form?.errors?.tagline || []}
			/>
			<Input
				label="Project URL"
				type="text"
				id="url"
				value={form?.data?.url || data.project.url}
				errors={form?.errors?.url || []}
			/>
			<TextArea
				label="Project Description"
				id="description"
				value={form?.data?.description || data.project.description}
				errors={form?.errors?.description || []}
			/>
			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				{#if data.project.thumbnail}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="h-5 w-5 text-white" />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={data.project.thumbnail
									? getImageUrl(
											data.project.collectionId,
											data.project.id,
											data.project.thumbnail,
											'80x80'
									  )
									: `https://via.placeholder.com/80/4506cb/FFFFFF/?text=${data.project.name}`}
								alt="thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					id="thumbnail"
					name="thumbnail"
					class="file-input file-input-bordered w-full max-w-lg mt-2"
				/>
				{#if form?.errors?.thumbnail && form?.errors?.thumbnail?.length > 0}
					{#each form.errors.thumbnail as error}
						<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
				<div class="w-full max-w-lg pt-3">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
				</div>
				<div class="w-full max-w-lg pt-3">
					<Modal label={data.project.id} checked={modalOpen}>
						<span slot="trigger" class="btn btn-secondary w-full">Cancel</span>
						<div slot="heading">
							<h3 class="text-2xl">Leave without saving {data.project.name}?</h3>
							<p class="text-base font-normal mt-2">
								Changes made will not be saved. Are you sure you want to leave?
							</p>
						</div>
						<div slot="actions" class="flex w-full items-center justify-center space-x-2">
							<label for={data.project.id} class="btn btn-outline">No</label>
							<form action="?/cancelChanges" method="POST" use:enhance>
								<button class="btn btn-secondary" type="submit">Yes</button>
							</form>
						</div>
					</Modal>
				</div>
			</div>
		</form>
	</div>
</div>
