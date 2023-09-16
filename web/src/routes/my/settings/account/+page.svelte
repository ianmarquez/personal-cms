<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal } from '$lib/components';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let data;
	export let form;

	let emailModalOpen: boolean = false;
	let usernameModalOpen: boolean = false;
	let loading: boolean = false;

	$: emailModalOpen;
	$: usernameModalOpen;
	$: loading;

	const submitUpdateUsername: SubmitFunction = () => {
		loading = true;
		usernameModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					usernameModalOpen = false;
					break;
				case 'failure':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const submitUpdateEmail: SubmitFunction = () => {
		loading = true;
		emailModalOpen = true;
		return async ({ result }) => {
			console.log(result);
			switch (result.type) {
				case 'success':
					await invalidateAll();
					emailModalOpen = false;
					break;
				case 'failure':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Email</h3>
		<div class="divider" />
		<Input
			label="Email"
			type="email"
			id="email"
			required
			disabled
			value={form?.data?.email || data?.user?.email}
			errors={form?.errors?.email}
		/>
		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>
			<h3 slot="heading">Change Your Email</h3>
			<form use:enhance={submitUpdateEmail} action="?/updateEmail" method="POST" class="space-y-2">
				<Input
					label="Enter your new email address"
					id="email"
					required={true}
					value={form?.data?.email || data?.user?.email}
					errors={form?.errors?.email}
					disabled={loading}
				/>
				<button class="btn btn-primary w-full" disabled={loading} type="submit">
					Change My Email
				</button>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Username</h3>
		<div class="divider" />
		<Input
			label="Username"
			id="username"
			value={form?.data?.username || data?.user?.username}
			errors={form?.errors?.username}
			required
			disabled
		/>
		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>
			<h3 slot="heading">Change Your Username</h3>
			<form
				use:enhance={submitUpdateUsername}
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
			>
				<Input
					label="Enter your new username"
					type="text"
					id="username"
					required={true}
					disabled={loading}
					value={form?.data?.username || data?.user?.username}
					errors={form?.errors?.username}
				/>
				<button class="btn btn-primary w-full" type="submit" disabled={loading}>
					Change My Username
				</button>
			</form>
		</Modal>
	</div>
</div>
