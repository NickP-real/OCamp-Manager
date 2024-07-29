import { isExisted } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { participant, selectParticipantSchema, type CreateParticipant } from '@db/schema/users';
import { and, eq } from 'drizzle-orm';

type UpdateParticipantBody = Partial<CreateParticipant>;

const participantList = selectParticipantSchema.array();

const isExist = isExisted(participant.deletedAt);

export async function getParticipants() {
	const allParticipants = await db.select().from(participant).where(isExist);
	return participantList.parse(allParticipants);
}

export async function getParticipantById(id: number) {
	const participantData = await db
		.select()
		.from(participant)
		.where(and(isExist, eq(participant.id, id)))
		.limit(1);

	return participantData[0];
}

export async function createParticipant(data: CreateParticipant) {
	await db.insert(participant).values(data);
}

export async function updateParticipantById(id: number, data: UpdateParticipantBody) {
	await db
		.update(participant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(participant.id, id)));
}

export async function deleteParticipantById(id: number) {
	await db
		.update(participant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(participant.id, id)));
}
