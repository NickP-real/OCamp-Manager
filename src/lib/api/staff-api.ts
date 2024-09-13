import { api } from "$lib/utils/fetch-utils";
import {
	getSearchParamsFromCollectionParams,
	type CollectionParams
} from "$lib/utils/params-utils";
import type { Staff } from "@db/schema/staff";

export async function getStaffApi(collectionParams?: CollectionParams) {
	const searchParams = getSearchParamsFromCollectionParams(collectionParams);
	const url = `/api/staffs?${searchParams.toString()}`;
	const res = await api<Staff[]>(url);
	return await res.json();
}
