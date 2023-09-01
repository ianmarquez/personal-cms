<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let data;
	import { Input } from '$lib/components';
	import { getImageUrl } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Icon, Pencil } from 'svelte-hero-icons';

	let loading = false;
	$: loading = false;

	const showPreview = (event: Event) => {
		const target = <HTMLInputElement>event.target;
		if (!target) return;
		const files = target.files;

		if (files && files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			preview.src = src;
		}
	};

	const submitUpdateProfile: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full">
	<form
		action="?/updateProfile"
		method="post"
		class="flex flex-col space-y-2 w-full"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium">Update Profile</h3>
		<div class="form-control w-full max-w-lg">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text"> Profile Picture </span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full">
				<label for="avatar" class="absolute -bottom-0 5 -right-0 5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Icon src={Pencil} class="w-4 h-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						id="avatar-preview"
						src={data.user?.avatar
							? getImageUrl(data.user.collectionName, data.user.id, data.user.avatar)
							: 'https://ui-avatars.com/api/?name=' + data.user?.name}
						class="hover:cursor-pointer"
						alt="user avatar"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="name" label="Name" type="text" value={data?.user?.name} disabled={loading} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}
				>Update Profile</button
			>
		</div>
	</form>
</div>
