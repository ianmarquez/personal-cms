<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/index.js';
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Reset Password
	</h2>
	<p class="text-center mt-1">We'll send you an email with a link to reset your password.</p>
	<form class="flex flex-col items-center space-y-2 w-full pt-4 max-w-md" method="POST" use:enhance>
		<Input
			id="email"
			label="Email"
			type="email"
			value={form?.data?.email || ''}
			errors={form?.errors?.email}
		/>
		<div class="w-full pt-2">
			<button class="btn btn-primary w-full" type="submit">Request Password Reset</button>
		</div>

		{#if form?.success}
			<div class="alert alert-success shadow-lg w-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>An email has been sent to reset your password.</span>
			</div>
		{/if}
	</form>
</div>
