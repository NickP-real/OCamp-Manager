import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	type CreateCampParticipant,
	selectCampParticipantSchema,
	campParticipant,
	type CampParticipant
} from "@db/schema/camp-participant";

import { and, eq } from "drizzle-orm";

type UpdateCampParticipantBody = Partial<CreateCampParticipant>;

const campParticipantList = selectCampParticipantSchema.array();

const isExist = isExisted(campParticipant.deletedAt);

export async function getAll() {
	const allCampParticipants = await db.select().from(campParticipant).where(isExist);
	return campParticipantList.parse(allCampParticipants);
}

export async function getCampParticipantById(id: CampParticipant["id"]) {
	const campParticipantData = await db
		.select()
		.from(campParticipant)
		.where(and(isExist, eq(campParticipant.id, id)))
		.limit(1);

	ifEmptyThrowError(campParticipantData, "Camp participant data not found");

	return selectCampParticipantSchema.parse(campParticipantData.at(0));
}

export async function getCampParticipantsByCampId(campId: CampParticipant["campId"]) {
	const allCampParticipants = await db
		.select()
		.from(campParticipant)
		.where(and(isExist, eq(campParticipant.campId, campId)));
	return campParticipantList.parse(allCampParticipants);
}

export async function createCampParticipant(data: CreateCampParticipant) {
	await db.insert(campParticipant).values(data);
}

export async function updateCampParticipantById(
	id: CampParticipant["id"],
	data: UpdateCampParticipantBody
) {
	await db
		.update(campParticipant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(campParticipant.id, id)));
}

export async function deleteCampParticipantById(id: CampParticipant["id"]) {
	await db
		.update(campParticipant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(campParticipant.id, id)));
}
