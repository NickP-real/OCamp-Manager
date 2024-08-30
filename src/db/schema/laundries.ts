import { index, integer, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { softDeleteColumns } from "../utils/columns-util";
import { paymentMethodEnum } from "./enums";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const laundryItem = pgTable(
	"laundry_item",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 256 }).notNull(),
		...softDeleteColumns
	},
	(laundryItem) => ({
		laundryItemIdx1: uniqueIndex("laundry_item_idx_1").on(laundryItem.name),
		laundryItemIdx2: index("laundry_item_idx_2").on(laundryItem.deletedAt),
		laundryItemIdx3: index("laundry_item_idx_3").on(laundryItem.createdAt),
		laundryItemIdx4: index("laundry_item_idx_4").on(laundryItem.updatedAt)
	})
);

export const selectLaundryItemSchema = createSelectSchema(laundryItem);
export const insertLaundryItemSchema = createInsertSchema(laundryItem, {
	name: ({ name }) => name.trim().min(1)
});
export type LaundryItem = typeof laundryItem.$inferSelect;
export type CreateLaundryItem = typeof laundryItem.$inferInsert;

export const roomLaundryItem = pgTable(
	"room_laundry_item",
	{
		id: serial("id").primaryKey(),
		roomId: integer("room_id").notNull(),
		itemId: integer("item_id").notNull(),
		quantity: integer("quantity").notNull(),
		paymentMethod: paymentMethodEnum("payment_method").notNull(),
		...softDeleteColumns
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
