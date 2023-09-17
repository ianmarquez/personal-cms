<script lang="ts">
	import clsx from 'clsx';
</script>

<div class="hero aspect-video h-fit flex flex-row">
	<div class="hero-content text-neutral-content">
		<div class="w-full flex flex-col gap-2 sm:gap-5">
			<p class="text-lg sm:text-xl lg:text-2xl text-primary">Hi my name is</p>
			<h1 class="mb-5 text-3xl sm:text-5xl lg:text-8xl font-semibold">Ian Marquez.</h1>
			<p
				class="relative w-[max-content]
          before:absolute before:inset-0 before:animate-typewriter before:bg-base-100
          after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
          after:bg-primary text-3xl sm:text-5xl lg:text-8xl text-secondary"
			>
				I build <span class="text-primary font-semibold">"stuff"</span> for the web.
			</p>
			<p class="max-w-lg text-sm sm:text-md lg:text-lg">
				I'm a software engineer with 10+ years of industry experience. Feel free to reach out to me
				through the channels below.
			</p>
			<section class="flex flex-row gap-4 text-2xl">
				<div class="tooltip tooltip-primary" data-tip="Neovim">
					<iconify-icon icon="devicon:vim" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="Svelte and SvelteKit">
					<iconify-icon icon="devicon:svelte" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="NodeJS">
					<iconify-icon icon="devicon:nodejs" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="Javascript">
					<iconify-icon icon="devicon:javascript" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="Typescript">
					<iconify-icon icon="devicon:typescript" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="React">
					<iconify-icon icon="devicon:react" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="NextJS">
					<iconify-icon icon="devicon:nextjs" />
				</div>
				<div class="tooltip tooltip-primary" data-tip="TailwindCSS">
					<iconify-icon icon="devicon:tailwindcss" />
				</div>
			</section>
			<section
				class={clsx(
					'flex flex-col justrify-center gap-4',
					'[&>a]:flex [&>a]:flex-row [&>a]:items-center [&>a]:gap-2 [&>a]:w-fit [&>a]:duration-300',
					'text-sm sm:text-md lg:text-lg'
				)}
			>
				<a href="tel:6593928822" target="_blank" class="link hover:text-primary">
					<iconify-icon icon="bi:telephone-fill" />
					+6593928822
				</a>
				<a href="mailto:regilmarquez123@gmail.com" target="_blank" class="link hover:text-primary">
					<iconify-icon icon="bi:envelope-fill" />
					regilmarquez123@gmail.com
				</a>
				<a
					href="https://www.linkedin.com/in/ian-marquez-99930780/"
					target="_blank"
					class="link hover:text-primary"
				>
					<iconify-icon icon="bi:linkedin" />
					ian-marquez-99930780
				</a>
				<a href="https://github.com/ianmarquez" target="_blank" class="link hover:text-primary">
					<iconify-icon icon="bi:github" />
					ianmarquez
				</a>
			</section>
		</div>
	</div>
</div>
