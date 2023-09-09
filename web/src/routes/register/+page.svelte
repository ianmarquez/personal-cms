<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full max-w-md mx-auto">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign In</a
		> if you already have an account.
	</p>
	<form action="?/register" class="flex flex-col items-center space-y-2 w-full pt-4" method="POST">
		<Input
			type="text"
			label="Name"
			id="name"
			value={form?.data?.name || ''}
			errors={form?.errors?.name || []}
		/>
		<Input
			type="text"
			label="Email"
			id="email"
			value={form?.data?.email || ''}
			errors={form?.errors?.email || []}
		/>
		<Input type="password" label="Password" id="password" errors={form?.errors?.password || []} />
		<Input
			type="password"
			label="Confirm Password"
			id="passwordConfirm"
			errors={form?.errors?.passwordConfirm || []}
		/>
		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full" type="submit">Register</button>
		</div>
	</form>
</div>
