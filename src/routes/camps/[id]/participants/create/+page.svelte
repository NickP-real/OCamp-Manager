<script lang="ts">
	import ParticipantForm from '$lib/components/form/ParticipantForm.svelte';

	export let data;
	const { form } = data;
</script>

<ParticipantForm formData={form} />
