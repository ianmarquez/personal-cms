<script lang="ts">
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex-col flex space-y-2 w-full">
			<h3 class="text-2xl font-medium">Change Password</h3>
			<div class="divider" />
			<Input
				label="Old Password"
				type="password"
				id="oldPassword"
				required
				errors={form?.errors?.oldPassword}
			/>
			<Input
				label="New Password"
				type="password"
				id="password"
				required
				errors={form?.errors?.password}
			/>
			<Input
				label="Confirm New Password"
				type="password"
				id="passwordConfirm"
				required
				errors={form?.errors?.passwordConfirm}
			/>
			<a href="/reset-password" class="text-primary hover:cursor-pointer hover:underline">
				I forgot my password
			</a>
			<div class="w-full max-w-lg pt-3">
				<button class="btn btn-primary w-full max-w-lg" type="submit"> Update Password </button>
			</div>
		</form>
	</div>
</div>
