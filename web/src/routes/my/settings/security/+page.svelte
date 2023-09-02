<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loading = false;
	$: loading;

	const submitUpdatePassword: SubmitFunction = () => {
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
	<div class="w-full">
		<form
			use:enhance={submitUpdatePassword}
			action="?/updatePassword"
			method="POST"
			class="flex-col flex space-y-2 w-full"
		>
			<h3 class="text-2xl font-medium">Change Password</h3>
			<div class="divider" />
			<Input label="Old Password" type="password" id="oldPassword" required disabled={loading} />
			<Input label="New Password" type="password" id="password" required disabled={loading} />
			<Input
				label="Confirm New Password"
				type="password"
				id="passwordConfirm"
				required
				disabled={loading}
			/>
			<a href="/reset-password" class="text-primary hover:cursor-pointer hover:underline">
				I forgot my password
			</a>
			<div class="w-full max-w-lg pt-3">
				<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
					Update Password
				</button>
			</div>
		</form>
	</div>
</div>
