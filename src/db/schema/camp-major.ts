import { generateEntityId, entityTimestampColumns } from "../utils/entity-utils";
import { index, pgTable, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

const TABLE_NAME = "camp_major";

export const campMajor = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		campId: varchar("camp_id", { length: 24 }).notNull(),
		majorId: varchar("major_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(campMajor) => ({
		campMajorIdx1: index("camp_major_idx_1").on(campMajor.campId),
		campMajorIdx2: index("camp_major_idx_2").on(campMajor.majorId)
	})
);

export const selectCampMajorSchema = createSelectSchema(campMajor);
export const insertCampMajorSchema = createInsertSchema(campMajor);
export type CampMajor = typeof campMajor.$inferSelect;
export type CreateCampMajor = typeof campMajor.$inferInsert;
