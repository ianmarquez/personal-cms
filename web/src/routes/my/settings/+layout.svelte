<script>
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account'
		},
		{
			title: 'Security',
			href: '/my/settings/security'
		}
	];
</script>

<div class="w-full h-full px-2">
	<h3 class="text-2xl font-medium">Setings</h3>
	<div class="divider" />
</div>
<div class="flex w-full h-full space-x-4">
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		{#each navigation as item}
			<li>
				<a href={item.href} class="font-medium {$page.url.pathname === item.href && 'active'}"
					>{item.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full">
		<slot />
	</div>
</div>
