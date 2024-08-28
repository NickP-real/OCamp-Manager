<script lang="ts">
	import Table from "$lib/components/table/Table.svelte";
	import type { Staff } from "@db/schema/users";
	import { createColumnHelper } from "@tanstack/svelte-table";

	export let data;
	const { staffs } = data;

	const columnHelper = createColumnHelper<Staff>();

	const columns = [
		columnHelper.accessor("firstName", { header: "First name", cell: (info) => info.getValue() }),
		columnHelper.accessor("lastName", { header: "Last name", cell: (info) => info.getValue() }),
		columnHelper.accessor("nickname", { header: "Nickname", cell: (info) => info.getValue() }),
		columnHelper.accessor("phone", { header: "Phone", cell: (info) => info.getValue() })
	];
</script>

<a href="/staffs/create">Add staff</a>

<Table data={[]} {columns} />
