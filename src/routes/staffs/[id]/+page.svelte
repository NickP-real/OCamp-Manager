<script lang="ts">
	import StaffForm from '$lib/components/form/StaffForm.svelte';

	export let data;
</script>

<StaffForm mode="update" formData={data.form} />
