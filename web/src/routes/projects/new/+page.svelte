<script lang="ts">
	import { Input } from '$lib/components';
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			enctype="multipart/form-data"
			class="flex flex-col space-y-2 w-full items-center"
		>
			<h3 class="text-3xl font-bold">Tell us more about this project</h3>
			<p class="mt-2 text-lg">We'll need the name, tagline, link and description</p>
			<Input label="Name" type="text" id="name" required />
			<Input label="Tagline" type="text" id="tagline" />
			<Input label="Project URL" type="text" id="url" />
			<div class="form-control w-full max-w-lg">
				<label for="description" class="label font-medium pb-1">
					<span class="label-text">Project Description</span>
				</label>
				<textarea
					name="description"
					id="description"
					cols="30"
					rows="10"
					class="textarea textarea-bordered h-24 resize-none"
				/>
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					class="file-input file-input-bordered w-full max-w-lg"
				/>
			</div>
			<div class="w-full max-w-lg pt-3">
				<button class="btn btn-primary w-full max-w-lg" type="submit">Create Project</button>
			</div>
		</form>
	</div>
</div>
