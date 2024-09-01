import { index, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "laundry_item";

export const laundryItem = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		name: varchar("name", { length: 256 }).notNull(),
		...entityTimestampColumns
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
