<script lang="ts">
	import { Input } from '$lib/components';
	import { getImageUrl } from '$lib/utils.js';
	import { Icon, Trash } from 'svelte-hero-icons';

	export let data;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/updateProject"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
		>
			<h3 class="text-3xl font-bold">Edit {data.project.name}</h3>
			<Input label="Project name" type="text" id="name" required value={data.project.name} />
			<Input
				label="Project Tagline"
				type="text"
				id="tagline"
				required
				value={data.project.tagline}
			/>
			<Input label="Project URL" type="text" id="url" required value={data.project.url} />
			<div class="form-control w-full max-w-lg">
				<label for="description" class="label font-medium pb-1">
					<span class="label-text">Project Description</span>
				</label>
				<textarea
					name="description"
					id="description"
					class="textarea textarea-bordered h-24 resize-none"
					value={data.project.description}
				/>
			</div>
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
				<div class="w-full max-w-lg pt-3">
					<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
				</div>
			</div>
		</form>
	</div>
</div>
