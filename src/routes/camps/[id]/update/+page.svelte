<script lang="ts">
	import CampForm from "$lib/components/form/CampForm.svelte";

	export let data;
</script>

<CampForm formData={data.form} majors={data.majors} mode="update" />
