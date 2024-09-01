import { isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { campParticipant, type CampParticipant } from "@db/schema/camp-participant";

import {
	participant,
	selectParticipantSchema,
	type CreateParticipant,
	type Participant
} from "@db/schema/participant";
import { and, eq } from "drizzle-orm";

type UpdateParticipantBody = Partial<CreateParticipant>;

const participantList = selectParticipantSchema.array();

const isExist = isExisted(participant.deletedAt);

export async function getAll() {
	const allParticipants = await db.select().from(participant).where(isExist);
	return participantList.parse(allParticipants);
}

export async function getParticipantById(id: Participant["id"]) {
	const participantData = await db
		.select()
		.from(participant)
		.where(and(isExist, eq(participant.id, id)))
		.limit(1);

	return participantData[0];
}

export async function getParticipantsByCampId(campId: CampParticipant["campId"], tx = db) {
	return await tx
		.select({ participant })
		.from(participant)
		.leftJoin(campParticipant, eq(participant.id, campParticipant.participantId))
		.where(and(eq(campParticipant.campId, campId), isExist));
}

export async function createParticipant(data: CreateParticipant, tx = db) {
	return await tx.insert(participant).values(data).returning();
}

export async function updateParticipantById(id: Participant["id"], data: UpdateParticipantBody) {
	await db
		.update(participant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(participant.id, id)));
}

export async function deleteParticipantById(id: Participant["id"]) {
	await db
		.update(participant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(participant.id, id)));
}
