import { index, pgTable, unique, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "room_participant";

export const roomParticipant = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		roomId: varchar("room_id", { length: 24 }).notNull(),
		campParticipantId: varchar("camp_participant_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(roomParticipant) => ({
		roomParticipantUnq1: unique("room_participant_unq_1").on(
			roomParticipant.campParticipantId,
			roomParticipant.roomId
		),
		roomParticipantIdx1: uniqueIndex("room_participant_idx_1").on(roomParticipant.roomId),
		roomParticipantIdx2: uniqueIndex("room_participant_idx_2").on(
			roomParticipant.campParticipantId
		),
		roomParticipantIdx3: index("room_participant_idx_3").on(roomParticipant.deletedAt),
		roomParticipantIdx4: index("room_participant_idx_4").on(roomParticipant.createdAt),
		roomParticipantIdx5: index("room_participant_idx_5").on(roomParticipant.updatedAt)
	})
);

export const selectRoomParticipantSchema = createSelectSchema(roomParticipant);
export const insertRoomParticipantSchema = createInsertSchema(roomParticipant);
export type RoomParticipant = typeof roomParticipant.$inferSelect;
export type CreateRoomParticipant = typeof roomParticipant.$inferInsert;
