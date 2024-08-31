import {
	boolean,
	date,
	index,
	numeric,
	pgTable,
	text,
	uniqueIndex,
	varchar
} from "drizzle-orm/pg-core";
import { generateEntityId, entityTimestampColumns } from "../utils/entity-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "camp";

export const camp = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		name: varchar("name", { length: 256 }).unique().notNull(),
		fromDate: date("from_date", { mode: "date" }).notNull(),
		toDate: date("to_date", { mode: "date" }).notNull(),
		description: text("text").notNull(),
		hasLaundry: boolean("hasLaundry").notNull().default(false),
		laundryPrice: numeric("laundry_price", { precision: 10, scale: 2 }),
		...entityTimestampColumns
	},
	(camp) => ({
		campIdx1: uniqueIndex("camp_idx_1").on(camp.name),
		campIdx2: index("camp_idx_2").on(camp.fromDate),
		campIdx3: index("camp_idx_3").on(camp.toDate),
		campIdx4: index("camp_idx_4").on(camp.hasLaundry),
		campIdx5: index("camp_idx_5").on(camp.deletedAt),
		campIdx6: index("camp_idx_6").on(camp.createdAt),
		campIdx7: index("camp_idx_7").on(camp.updatedAt)
	})
);

export const selectCampSchema = createSelectSchema(camp);
export const insertCampSchema = createInsertSchema(camp, {
	name: ({ name }) => name.trim().min(1),
	description: ({ description }) => description.trim().min(1)
});
export type Camp = typeof camp.$inferSelect;
export type CreateCamp = typeof camp.$inferInsert;
