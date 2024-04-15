<script lang="ts">
	import { formatDateInput } from '$lib/client/utils/date-util';
	export let id: string;
	export let name: string;
	export let value: Date;

	$: formatedDate = formatDateInput(value);
</script>

<input
	{id}
	{name}
	type="date"
	class="py-1 px-2 text-black rounded border"
	value={formatedDate}
	on:input={(event) => (value = new Date(event.currentTarget.value))}
/>
