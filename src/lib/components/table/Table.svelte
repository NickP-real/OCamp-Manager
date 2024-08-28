<script lang="ts" generics="TData">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type ColumnDef
	} from "@tanstack/svelte-table";

	export let data: TData[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let columns: ColumnDef<TData, any>[];

	const table = createSvelteTable({ columns, data, getCoreRowModel: getCoreRowModel() });
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
		<tbody>
			{#if data.length === 0}
				<tr>
					<td colspan={$table.getFlatHeaders().length} class="p-2 text-center">No data</td>
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
