<script lang="ts">
	export let data;
</script>

<a href="/staffs/create">Add staff</a>
{#await data.staffs}
	<p>Loading</p>
{:then staffs}
	{#if !staffs || staffs.length === 0}
		<p>No staff founds</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Nickname</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each staffs as staff}
					<tr>
						<td>{staff.firstName}</td>
						<td>{staff.lastName}</td>
						<td>{staff.nickname}</td>
						<td><a href="/staffs/{staff.id}">View</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{/await}
