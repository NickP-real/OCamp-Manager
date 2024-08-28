<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import type { FormMode } from "./type";
	import { campStaffSchema, type CampStaffSchema } from "$lib/client/form/camp-staff-form";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/form-ui";
	import type { Staff } from "@db/schema/users";

	export let mode: FormMode = "create";
	export let formData: SuperValidated<Infer<CampStaffSchema>>;
	export let staffs: Promise<Staff[] | undefined>;

	const form = superForm(formData, { validators: zodClient(campStaffSchema) });
	const { enhance, form: formFieldData } = form;

	function onStaffSelect(staff: CustomEvent<Staff>) {
		$formFieldData.staffId = staff.detail.id;
	}
</script>

<form method="post" use:enhance class="space-y-4">
	<Form.Title>
		{#if mode === "create"}
			Add staff to camp
		{:else}
			Update staff
		{/if}
	</Form.Title>

	{#await staffs}
		<Form.Skeleton>Loading staffs...</Form.Skeleton>
	{:then staffs}
		{#if !staffs}
			<p>No staffs found</p>
		{:else}
			{@const items = staffs.map((staff) => ({
				label: `${staff.firstName} ${staff.lastName}`,
				value: staff
			}))}
			<Form.Combobox id="" {items} on:itemselect={onStaffSelect} />
		{/if}
	{/await}
</form>
