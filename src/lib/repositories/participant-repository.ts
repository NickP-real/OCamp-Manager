import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { insertParticipantSchema, participant, selectParticipantSchema } from '@db/schema/users';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateParticipantBody = z.infer<typeof insertParticipantSchema>;
type UpdateParticipantBody = Partial<CreateParticipantBody>;

const participantList = selectParticipantSchema.array();

const isExist = isExisted(participant.deletedAt);
const hasSameId = isSameId(participant.id);

export async function getParticipants() {
	const allParticipants = await db.select().from(participant).where(isExist);
	return participantList.parse(allParticipants);
}

export async function getParticipantById(id: number) {
	const participantData = await db
		.select()
		.from(participant)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(participantData, 'Participant data is not found');

	return selectParticipantSchema.parse(participantData.at(0));
}

export async function createParticipant(data: CreateParticipantBody) {
	await db.insert(participant).values(data);
}

export async function updateParticipantById(id: number, data: UpdateParticipantBody) {
	await db
		.update(participant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteParticipantById(id: number) {
	await db
		.update(participant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
