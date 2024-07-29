import {
	insertRoomParticipantSchema,
	insertRoomSchema,
	insertRoomStaffSchema
} from '@db/schema/rooms';
import { z } from 'zod';

export const roomSchema = insertRoomSchema
	.omit({
		id: true,
		campId: true,
		createdAt: true,
		updatedAt: true,
		deletedAt: true
	})
	.merge(z.object({}));

export const roomParticipantSchema = insertRoomParticipantSchema
	.omit({
		id: true,
		roomId: true,
		createdAt: true,
		updatedAt: true,
		deletedAt: true
	})
	.merge(roomSchema);

export const roomStaffSchema = insertRoomStaffSchema
	.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true })
	.merge(roomSchema);

export type RoomSchema = typeof roomSchema;
export type RoomParticipantSchema = typeof roomParticipantSchema;
export type RoomStaffSchema = typeof roomStaffSchema;
