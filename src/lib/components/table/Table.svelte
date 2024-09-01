<script lang="ts" generics="TData">
	import { writable } from "svelte/store";

	import Checkbox from "../ui/Checkbox.svelte";

	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		renderComponent,
		type ColumnDef,
		type RowSelectionState,
		type TableOptions,
		type Updater
	} from "@tanstack/svelte-table";

	type $$Props = {
		data: TData[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		columns: ColumnDef<TData, any>[];
		selection?: RowSelectionState;
		idKey?: keyof TData;
	};

	export let data: $$Props["data"];
	let dataColumns: $$Props["columns"];
	export { dataColumns as columns };
	export let selection: $$Props["selection"] = {};
	export let idKey: $$Props["idKey"] = undefined;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const columns: ColumnDef<TData, any>[] = !selection
		? dataColumns
		: [
				{
					id: "select-col",
					header: ({ table }) =>
						renderComponent(Checkbox, {
							checked: table.getIsAllRowsSelected(),
							indeterminate: table.getIsSomeRowsSelected(),
							onChange: table.getToggleAllRowsSelectedHandler()
						}),
					cell: ({ row }) =>
						renderComponent(Checkbox, {
							checked: row.getIsSelected(),
							indeterminate: row.getIsSomeSelected(),
							onChange: row.getToggleSelectedHandler(),
							disabled: !row.getCanSelect()
						})
				},
				...dataColumns
			];

	let options = writable<TableOptions<TData>>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: idKey ? (row) => row[idKey] as string : undefined,
		enableRowSelection: !!selection,
		onRowSelectionChange: onRowSelection,
		state: { rowSelection: selection }
	});

	$: options.update((old) => ({ ...old, data })), console.log("change"), console.log(selection);

	function onRowSelection(state: Updater<RowSelectionState>) {
		if (!selection) return;

		selection = state instanceof Function ? state(selection) : state;

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				rowSelection: selection
			}
		}));

		return selection;
	}

	const table = createSvelteTable(options);
</script>

<div class="w-full overflow-hidden rounded-md border">
	<table class="w-full">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th class="py-2">
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody class="text-center">
			{#if data.length === 0}
				<tr>
					<td colspan={$table.getFlatHeaders().length} class="p-2">No data</td>
				</tr>
			{:else}
				{#each $table.getRowModel().rows as row}
					<tr>
						{#each row.getVisibleCells() as cell}
							<td class="p-2">
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
		{#if data.length > 0}
			<tfoot>
				{#each $table.getFooterGroups() as footerGroup}
					<tr>
						{#each footerGroup.headers as header}
							<th>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.footer, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</tfoot>
		{/if}
	</table>
</div>
