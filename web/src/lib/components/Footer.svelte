<script lang="ts">
	import clsx from 'clsx';
</script>

<footer
	class={clsx(
		'footer footer-center p-4 bg-base-200 text-base-content rounded flex flex-col gap-2 mt-5',
		'text-sm sm:text-md lg:text-lg'
	)}
>
	<aside>
		<p>
			Designed and built by
			<a href="https://github.com/ianmarquez" class="link text-primary">Ian Marquez</a> with
			<a href="https://kit.svelte.dev/" class="link text-primary">SvelteKit</a>
		</p>
	</aside>
	<nav class="flex flex-row gap-4">
		<a href="tel:6593928822" target="_blank" class="link hover:text-primary">
			<iconify-icon icon="bi:telephone-fill" />
		</a>
		<a href="mailto:regilmarquez123@gmail.com" target="_blank" class="link hover:text-primary">
			<iconify-icon icon="bi:envelope-fill" />
		</a>
		<a
			href="https://www.linkedin.com/in/ian-marquez-99930780/"
			target="_blank"
			class="link hover:text-primary"
		>
			<iconify-icon icon="bi:linkedin" />
		</a>
		<a href="https://github.com/ianmarquez" target="_blank" class="link hover:text-primary">
			<iconify-icon icon="bi:github" />
		</a>
	</nav>
</footer>
