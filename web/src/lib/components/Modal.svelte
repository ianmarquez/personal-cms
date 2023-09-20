<script lang="ts">
	export let label: string;
	export let checked: boolean;
</script>

<label for={label} class="w-fit">
	<slot name="trigger" />
</label>

<input type="checkbox" {checked} id={label} class="modal-toggle w-fit" />
<label for={label} class="modal sm:modal-bottom">
	<label for="" class="modal-box">
		<div class="font-bold text-xl text-center">
			<slot name="heading" />
		</div>
		<div class="my-2">
			<slot />
		</div>
		<div class="modal-action justify-center">
			<slot name="actions" />
		</div>
	</label>
</label>
