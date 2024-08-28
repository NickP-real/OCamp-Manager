<script lang="ts">
	import ParticipantForm from "$lib/components/form/ParticipantForm.svelte";

	export let data;
</script>

<ParticipantForm mode="update" formData={data.form} />
