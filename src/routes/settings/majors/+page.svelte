<script lang="ts">
	export let data;
	const { majors } = data;
</script>

<section>
	<a href="/settings/majors/create">Create Major</a>
</section>

<section>
	<h2>Majors</h2>
	{#await majors}
		<p>Loading majors...</p>
	{:then majors}
		{#each majors as major}
			{major.name}
		{/each}
	{/await}
	<!-- <table> -->
	<!-- 	<thead></thead> -->
	<!-- 	<tbody> -->
	<!-- 		{#each majors as major} -->
	<!-- 			<tr> -->
	<!-- 				<td> -->
	<!-- 					{major.name} -->
	<!-- 				</td> -->
	<!-- 			</tr> -->
	<!-- 		{/each} -->
	<!-- 	</tbody> -->
	<!-- </table> -->
</section>
