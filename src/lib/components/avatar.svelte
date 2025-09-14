<script lang="ts">
	let { placeholder } = $props();
</script>

<div class="avatar avatar-placeholder">
	<div
		class="w-8 rounded-full bg-neutral text-neutral-content ring-2 ring-primary ring-offset-2 ring-offset-base-100"
	>
		<span class="text-xs">{placeholder}</span>
	</div>
</div>
