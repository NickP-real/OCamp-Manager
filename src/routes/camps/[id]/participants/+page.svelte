<script lang="ts">
	import Table from "$lib/components/table/Table.svelte";
	import type { Participant } from "@db/schema/participant.js";
	
	import { createColumnHelper } from "@tanstack/svelte-table";

	export let data;
	const { participants, camp } = data;

	const columnHelper = createColumnHelper<Participant>();

	const columns = [
		columnHelper.accessor("firstName", { cell: (info) => info.getValue(), header: "First name" }),
		columnHelper.accessor("lastName", { cell: (info) => info.getValue(), header: "Last name" }),
		columnHelper.accessor("nickname", {
			cell: (info) => info.getValue() ?? "-",
			header: "Nickname"
		})
	];
</script>

<a href="/camps/{camp.id}/participants/create"> Add participant </a>

{#await participants}
	loading...
{:then participants}
	<Table data={participants} {columns} />
{/await}
