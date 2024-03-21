import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import {
	insertRoomParticipantSchema,
	roomParticipant,
	selectRoomParticipantSchema
} from '@db/schema/rooms';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateRoomParticipantBody = z.infer<typeof insertRoomParticipantSchema>;
type UpdateRoomParticipantBody = Partial<CreateRoomParticipantBody>;

const roomParticipantList = selectRoomParticipantSchema.array();

const isExist = isExisted(roomParticipant.deletedAt);
const hasSameId = isSameId(roomParticipant.id);
const hasSameCampParticipantId = isSameId(roomParticipant.campParticipantId);

export async function getRoomParticipants() {
	const allRoomParticipants = await db.select().from(roomParticipant).where(isExist);
	return roomParticipantList.parse(allRoomParticipants);
}

export async function getRoomParticipantById(id: number) {
	const roomParticipantData = await db
		.select()
		.from(roomParticipant)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(roomParticipantData, 'Room participant data is not found');

	return selectRoomParticipantSchema.parse(roomParticipantData.at(0));
}

export async function getRoomParticipantByCampParticipantId(campParticipantId: number) {
	const roomParticipantData = await db
		.select()
		.from(roomParticipant)
		.where(and(isExist, hasSameCampParticipantId(campParticipantId)))
		.limit(1);

	return roomParticipantData.at(0)
		? selectRoomParticipantSchema.parse(roomParticipantData.at(0))
		: null;
}

export async function createRoomParticipant(data: CreateRoomParticipantBody) {
	await db.insert(roomParticipant).values(data);
}

export async function createRoomParticipants(data: CreateRoomParticipantBody[]) {
	await db.insert(roomParticipant).values(data);
}

export async function updateRoomParticipantById(id: number, data: UpdateRoomParticipantBody) {
	await db
		.update(roomParticipant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function updateRoomParticipantByCampParticipantId(
	campParticipantId: number,
	data: UpdateRoomParticipantBody
) {
	await db
		.update(roomParticipant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameCampParticipantId(campParticipantId)));
}

export async function deleteRoomParticipantById(id: number) {
	await db
		.update(roomParticipant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteRoomParticipantByCampParticipantId(campParticipantId: number) {
	await db
		.update(roomParticipant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameCampParticipantId(campParticipantId)));
}
