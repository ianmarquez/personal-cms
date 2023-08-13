<script lang="ts">
	import Icon from '@iconify/svelte';

	export let form;
</script>

<div class="flex flex-col items-center h-full w-full max-w-md m-auto">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Login to your account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>register</a
		> if you don't have an account.
	</p>
	<form action="?/login" class="flex flex-col items-center space-y-2 w-full pt-4" method="POST">
		<div class="form-control w-full">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input type="text" name="email" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full">
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="w-full">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline">Forgot Password?</a
			>
		</div>
		<div class="w-full pt-2">
			<button class="btn btn-primary w-full" type="submit">Login</button>
		</div>
		{#if form?.notVerified}
			<div class="alert alert-error shadow-lg">
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
				<span>You must verify your email before you can login.</span>
			</div>
		{/if}
		<div class="w-full">
			<button formaction="?/OAuthDiscord" class="btn btn-secondary w-full" type="submit">
				<Icon icon="ic:baseline-discord" />
				Sign In With Discord
			</button>
		</div>
	</form>
</div>
