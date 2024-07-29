<script lang="ts">
	export let data;
	const { participants, camp } = data;
</script>

<a href="/camps/{camp.id}/participants/create"> Add participant </a>

{#await participants}
	loading...
{:then participants}
	{#each participants as participant}
		<p>{participant.nickname}</p>
	{/each}
	<!-- <table> -->
	<!--   <thead> -->
	<!--   </thead> -->
	<!--   <tbody></tbody> -->
	<!-- </table> -->
{/await}
