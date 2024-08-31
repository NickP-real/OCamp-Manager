import { index, pgTable, text, unique, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "room";
export const room = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		name: varchar("name", { length: 256 }).notNull(),
		description: text("description"),
		campId: varchar("camp_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(room) => ({
		roomUnq1: unique("room_unq_1").on(room.name, room.campId),
		roomIdx1: uniqueIndex("room_idx_1").on(room.name),
		roomIdx2: index("room_idx_2").on(room.campId),
		roomIdx3: index("room_idx_3").on(room.deletedAt),
		roomIdx4: index("room_idx_4").on(room.updatedAt),
		roomIdx5: index("room_idx_5").on(room.createdAt)
	})
);

export const selectRoomSchema = createSelectSchema(room);
export const insertRoomSchema = createInsertSchema(room, {
	name: ({ name }) => name.trim().min(1)
});
export type Room = typeof room.$inferSelect;
export type CreateRoom = typeof room.$inferInsert;
