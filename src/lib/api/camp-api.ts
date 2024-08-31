import { api } from "$lib/utils/fetch-utils";
import {
	getSearchParamsFromCollectionParams,
	idSchema,
	type CollectionParams
} from "$lib/utils/params-utils";
import type { Participant } from "@db/schema/participant";
import type { Staff } from "@db/schema/staff";

export async function getCampParticipantsByCampIdApi(
	campId: string | number,
	collectionParams?: CollectionParams
) {
	const parsedId = idSchema.parse(campId);
	const searchParams = getSearchParamsFromCollectionParams(collectionParams);
	const res = await api<Participant[]>(
		`/api/camps/${parsedId}/participants?${searchParams.toString()}`
	);
	return await res.json();
}

export async function getCampStaffsByCampIdApi(
	campId: string | number,
	collectionParams?: CollectionParams
) {
	const parsedId = idSchema.parse(campId);
	const searchParams = getSearchParamsFromCollectionParams(collectionParams);
	const res = await api<Staff[]>(`/api/camps/${parsedId}/staffs?${searchParams.toString()}`);

	return await res.json();
}
