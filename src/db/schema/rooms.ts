import {
	index,
	integer,
	pgTable,
	serial,
	text,
	unique,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';
import { camp, campParticipant, campStaff } from './camps';
import { softDeleteColumns } from '../util-columns';

export const room = pgTable(
	'room',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description'),
		campId: integer('camp_id')
			.notNull()
			.references(() => camp.id),
		...softDeleteColumns
	},
	(room) => ({
		roomUnq1: unique('room_unq_1').on(room.name, room.campId),
		roomIdx1: uniqueIndex('room_idx_1').on(room.name),
		roomIdx2: index('room_idx_2').on(room.campId),
		roomIdx3: index('room_idx_3').on(room.deletedAt),
		roomIdx4: index('room_idx_4').on(room.updatedAt),
		roomIdx5: index('room_idx_5').on(room.createdAt)
	})
);

export const roomParticipant = pgTable(
	'room_participant',
	{
		id: serial('id').primaryKey(),
		roomId: integer('room_id')
			.notNull()
			.references(() => room.id),
		campParticipantId: integer('camp_participant_id')
			.notNull()
			.references(() => campParticipant.id),
		...softDeleteColumns
	},
	(roomParticipant) => ({
		roomParticipantUnq1: unique('room_participant_unq_1').on(
			roomParticipant.campParticipantId,
			roomParticipant.roomId
		),
		roomParticipantIdx1: uniqueIndex('room_participant_idx_1').on(roomParticipant.roomId),
		roomParticipantIdx2: uniqueIndex('room_participant_idx_2').on(
			roomParticipant.campParticipantId
		),
		roomParticipantIdx3: index('room_participant_idx_3').on(roomParticipant.deletedAt),
		roomParticipantIdx4: index('room_participant_idx_4').on(roomParticipant.createdAt),
		roomParticipantIdx5: index('room_participant_idx_5').on(roomParticipant.updatedAt)
	})
);

export const roomStaff = pgTable(
	'room_staff',
	{
		id: serial('id').primaryKey(),
		roomId: integer('room_id')
			.notNull()
			.references(() => room.id),
		campStaffId: integer('camp_staff_id')
			.notNull()
			.references(() => campStaff.id),
		...softDeleteColumns
	},
	(roomStaff) => ({
		roomStaffUnq1: unique('room_staff_unq_1').on(roomStaff.campStaffId, roomStaff.roomId),
		roomStaffIdx1: uniqueIndex('room_staff_idx_1').on(roomStaff.roomId),
		roomStaffIdx2: uniqueIndex('room_staff_idx_2').on(roomStaff.campStaffId),
		roomStaffIdx3: index('room_staff_idx_3').on(roomStaff.deletedAt),
		roomStaffIdx4: index('room_staff_idx_4').on(roomStaff.createdAt),
		roomStaffIdx5: index('room_staff_idx_5').on(roomStaff.updatedAt)
	})
);
