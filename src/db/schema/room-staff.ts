import { index, pgTable, unique, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "room_staff";
export const roomStaff = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		roomId: varchar("room_id", { length: 24 }).notNull(),
		campStaffId: varchar("camp_staff_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(roomStaff) => ({
		roomStaffUnq1: unique("room_staff_unq_1").on(roomStaff.campStaffId, roomStaff.roomId),
		roomStaffIdx1: uniqueIndex("room_staff_idx_1").on(roomStaff.roomId),
		roomStaffIdx2: uniqueIndex("room_staff_idx_2").on(roomStaff.campStaffId),
		roomStaffIdx3: index("room_staff_idx_3").on(roomStaff.deletedAt),
		roomStaffIdx4: index("room_staff_idx_4").on(roomStaff.createdAt),
		roomStaffIdx5: index("room_staff_idx_5").on(roomStaff.updatedAt)
	})
);

export const selectRoomStaffSchema = createSelectSchema(roomStaff);
export const insertRoomStaffSchema = createInsertSchema(roomStaff);
export type RoomStaff = typeof roomStaff.$inferSelect;
export type CreateRoomStaff = typeof roomStaff.$inferInsert;
