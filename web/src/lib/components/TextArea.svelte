<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let id: string = '';
	export let label: string = '';
	export let disabled: boolean = false;
	export let required: boolean = false;

	export let errors: string[] = [];
</script>

<div class="form-control w-full max-w-lg">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		name={id}
		cols="30"
		rows="10"
		class="textarea textarea-bordered h-24 resize-none"
		{id}
		{placeholder}
		{value}
		{required}
		{disabled}
	/>
	{#if errors.length > 0}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
