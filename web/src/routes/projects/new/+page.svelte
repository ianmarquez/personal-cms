<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			enctype="multipart/form-data"
			class="flex flex-col space-y-2 w-full items-center"
			use:enhance
		>
			<h3 class="text-3xl font-bold">Tell us more about this project</h3>
			<p class="mt-2 text-lg">We'll need the name, tagline, link and description</p>
			<Input
				label="Name"
				type="text"
				id="name"
				errors={form?.errors?.name || []}
				value={form?.data?.name || ''}
			/>
			<Input
				label="Tagline"
				type="text"
				id="tagline"
				errors={form?.errors?.tagline || []}
				value={form?.data?.tagline || ''}
			/>
			<Input
				label="Project URL"
				type="text"
				id="url"
				errors={form?.errors?.url || []}
				value={form?.data?.url || ''}
			/>
			<TextArea
				label="Project Description"
				id="description"
				errors={form?.errors?.description || []}
				value={form?.data?.description || ''}
			/>
			<Input label="Thumbnail" type="file" id="thumbnail" errors={form?.errors?.thumbnail || []} />
			<div class="w-full max-w-lg pt-3">
				<button class="btn btn-primary w-full max-w-lg" type="submit">Create Project</button>
			</div>
		</form>
	</div>
</div>
