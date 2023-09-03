<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let label: string;
	export let type: 'text' | 'password' | 'email' | 'number' | 'file' = 'text';
	export let disabled: boolean = false;
	export let required: boolean = false;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		name={id}
		class="input input-bordered w-full max-w-lg"
		{type}
		{placeholder}
		{disabled}
		{required}
		{id}
		{value}
	/>
</div>
