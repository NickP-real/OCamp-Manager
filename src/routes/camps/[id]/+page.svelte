<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/client/utils/date-util';

	export let data: PageData;
	const { name, fromDate, toDate } = data.data;
</script>

{name}
{formatDate(fromDate)}
{formatDate(toDate)}
