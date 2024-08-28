<script lang="ts">
	import RoomForm from "$lib/components/form/RoomForm.svelte";

	export let data;
</script>

<RoomForm formData={data.form} />
