import { entityTimestampColumns } from "@db/utils/columns-util";
import { index, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const campMajor = pgTable(
	"camp_major",
	{
		id: serial("id").primaryKey(),
		campId: integer("camp_id").notNull(),
		majorId: integer("major_id").notNull(),
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
