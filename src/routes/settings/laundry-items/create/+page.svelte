<script lang="ts">
	import LaundryItemForm from '$lib/components/form/LaundryItemForm.svelte';

	export let data;
</script>

<LaundryItemForm formData={data.form} />
