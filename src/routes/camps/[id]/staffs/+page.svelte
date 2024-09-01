<script lang="ts">
	import { page } from "$app/stores";
	import Table from "$lib/components/table/Table.svelte";
	import type { Staff } from "@db/schema/staff";
	import { createColumnHelper } from "@tanstack/svelte-table";

	export let data;
	const { staffs } = data;

	const columnHelper = createColumnHelper<Staff>();

	const columns = [
		columnHelper.accessor("firstName", { header: "First name", cell: (info) => info.getValue() }),
		columnHelper.accessor("lastName", { header: "Last name", cell: (info) => info.getValue() }),
		columnHelper.accessor("nickname", { header: "Nickname", cell: (info) => info.getValue() })
	];
</script>

<a href="{$page.url.pathname}/create">Add staff</a>

{#await staffs}
	loading...
{:then staffs}
	{#if staffs}
		<Table data={staffs} {columns} />
	{/if}
{/await}
