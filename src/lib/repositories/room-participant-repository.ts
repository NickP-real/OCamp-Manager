import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	roomParticipant,
	selectRoomParticipantSchema,
	type CreateRoomParticipant
} from "@db/schema/rooms";
import { and, eq } from "drizzle-orm";

type UpdateRoomParticipantBody = Partial<CreateRoomParticipant>;

const roomParticipantList = selectRoomParticipantSchema.array();

const isExist = isExisted(roomParticipant.deletedAt);

export async function getRoomParticipants() {
	const allRoomParticipants = await db.select().from(roomParticipant).where(isExist);
	return roomParticipantList.parse(allRoomParticipants);
}

export async function getRoomParticipantById(id: number) {
	const roomParticipantData = await db
		.select()
		.from(roomParticipant)
		.where(and(isExist, eq(roomParticipant.id, id)))
		.limit(1);

	ifEmptyThrowError(roomParticipantData, "Room participant data is not found");

	return selectRoomParticipantSchema.parse(roomParticipantData.at(0));
}

export async function getRoomParticipantByCampParticipantId(campParticipantId: number) {
	const roomParticipantData = await db
		.select()
		.from(roomParticipant)
		.where(and(isExist, eq(roomParticipant.campParticipantId, campParticipantId)))
		.limit(1);

	return roomParticipantData.at(0)
		? selectRoomParticipantSchema.parse(roomParticipantData.at(0))
		: null;
}

export async function createRoomParticipant(data: CreateRoomParticipant) {
	await db.insert(roomParticipant).values(data);
}

export async function createRoomParticipants(data: CreateRoomParticipant[]) {
	await db.insert(roomParticipant).values(data);
}

export async function updateRoomParticipantById(id: number, data: UpdateRoomParticipantBody) {
	await db
		.update(roomParticipant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomParticipant.id, id)));
}

export async function updateRoomParticipantByCampParticipantId(
	campParticipantId: number,
	data: UpdateRoomParticipantBody
) {
	await db
		.update(roomParticipant)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomParticipant.campParticipantId, campParticipantId)));
}

export async function deleteRoomParticipantById(id: number) {
	await db
		.update(roomParticipant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomParticipant.id, id)));
}

export async function deleteRoomParticipantByCampParticipantId(campParticipantId: number) {
	await db
		.update(roomParticipant)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomParticipant.campParticipantId, campParticipantId)));
}
