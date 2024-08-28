<script lang="ts">
	import * as Form from "$lib/components/form-ui";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import type { FormMode } from "./type";
	import { roomSchema, type RoomSchema } from "$lib/client/form/room-form";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import type { Participant, Staff } from "@db/schema/users";
	import { debounce } from "$lib/utils/fetch-utils";
	import { getCampParticipantsByCampIdApi, getCampStaffsByCampIdApi } from "$lib/api/camp-api";

	export let mode: FormMode = "create";
	export let formData: SuperValidated<Infer<RoomSchema>>;

	let participants: Participant[] = [];
	let staffs: Staff[] = [];

	const form = superForm(formData, { validators: zodClient(roomSchema) });
	const { enhance, form: formField } = form;

	async function fetchParticipants(query?: string) {
		participants = await getCampParticipantsByCampIdApi($page.params.id, { q: query });
	}

	async function fetchStaffs(query?: string) {
		staffs = await getCampStaffsByCampIdApi($page.params.id, { q: query });
	}

	const debounceParticipant = debounce(fetchParticipants);
	const debounceStaffs = debounce(fetchStaffs);

	function onParticipantSelect(participant: Participant) {
		if ($formField.participants.some((data) => data.id === participant.id)) return;
		$formField.participants = [...$formField.participants, participant];
	}

	function onStaffSelect(staff: Staff) {
		if ($formField.staffs.some((data) => data.id === staff.id)) return;
		$formField.staffs = [...$formField.staffs, staff];
	}

	onMount(() => {
		fetchParticipants();
		fetchStaffs();
	});
</script>

<form method="post" use:enhance class="space-y-4">
	<Form.Title>
		{#if mode === "create"}
			Create Room
		{:else}
			Update Room
		{/if}
	</Form.Title>

	<Form.Input label="Room name" name="roomName" {form} />

	<Form.Combobox
		label="Participant"
		items={participants.map((participant) => ({
			label: `${participant.nickname}`,
			value: participant
		}))}
		on:inputchange={(event) => debounceParticipant(event.detail)}
		on:itemselect={(event) => onParticipantSelect(event.detail)}
	/>

	<Form.Combobox
		label="Staff"
		items={staffs.map((staff) => ({ label: `${staff.nickname}`, value: staff }))}
		on:inputchange={(event) => debounceStaffs(event.detail)}
		on:itemselect={(event) => onStaffSelect(event.detail)}
	/>

	<Form.ButtonSection>
		<button type="button" on:click={() => history.back()}>Cancel</button>
		<button type="submit" class="capitalize">{mode}</button>
	</Form.ButtonSection>
</form>
