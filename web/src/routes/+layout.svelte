<script lang="ts">
	import { getImageUrl } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
	import 'iconify-icon';
	export let data;
</script>

<Toaster />

<div class="min-h-full scroll-smooth">
	<nav class="navbar bg-base-100">
		{#if data.user}
			<div class="flex-1">
				<a href="/" class="btn btn-ghost normal-case text-xl">IanMarquez.dev</a>
			</div>
			<div class="flex-none z-10">
				<div class="dropdown dropdown-end mr-4">
					<a href="/projects/new" class="btn btn-primary btn-outline">Add Project</a>
				</div>
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								src={data.user?.avatar
									? getImageUrl(data.user.collectionName, data.user.id, data.user.avatar)
									: 'https://ui-avatars.com/api/?name=' + data.user?.name}
								alt="User Avatar"
							/>
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/my/projects" class="justify-between">My Projects</a>
						</li>
						<li>
							<a href="/my/settings">Settings</a>
						</li>
						<li>
							<form action="/logout" method="POST" class="w-full flex flex-row">
								<button type="submit" class="w-full text-start">Logout</button>
							</form>
						</li>
					</ul>
				</div>
			</div>
		{/if}
	</nav>
	<main>
		<div class="mx-auto px-4 sm:px-6 md:px-8">
			<slot />
		</div>
	</main>
</div>
