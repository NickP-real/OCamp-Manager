import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { paymentMethodEnum } from "./enums";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "room_laundry_item";

export const roomLaundryItem = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		roomId: varchar("room_id", { length: 24 }).notNull(),
		itemId: varchar("item_id", { length: 24 }).notNull(),
		quantity: integer("quantity").notNull(),
		paymentMethod: paymentMethodEnum("payment_method").notNull(),
		...entityTimestampColumns
	},
	(roomLaundryItem) => ({
		roomLaundryItemIdx1: index("room_laundry_item_idx_1").on(roomLaundryItem.roomId),
		roomLaundryItemIdx2: index("room_laundry_item_idx_2").on(roomLaundryItem.itemId),
		roomLaundryItemIdx3: index("room_laundry_item_idx_3").on(roomLaundryItem.deletedAt),
		roomLaundryItemIdx4: index("room_laundry_item_idx_4").on(roomLaundryItem.createdAt),
		roomLaundryItemIdx5: index("room_laundry_item_idx_5").on(roomLaundryItem.updatedAt)
	})
);

export const selectRoomLaundryItemSchema = createSelectSchema(roomLaundryItem);
export const insertRoomLaundryItemSchema = createInsertSchema(roomLaundryItem, {
	quantity: ({ quantity }) => quantity.min(0)
});
export type RoomLaundryItem = typeof roomLaundryItem.$inferSelect;
export type CreateRoomLaundryItem = typeof roomLaundryItem.$inferInsert;
