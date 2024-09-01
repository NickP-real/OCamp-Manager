import { generateEntityId, entityTimestampColumns } from "../utils/entity-utils";
import { index, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

const TABLE_NAME = "camp_staff";

export const campStaff = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		campId: varchar("camp_id", { length: 24 }).notNull(),
		staffId: varchar("staff_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(campStaff) => ({
		campStaffUnq1: unique("camp_staff_unq_1").on(campStaff.campId, campStaff.staffId),
		campStaffIdx1: index("camp_staff_idx_1").on(campStaff.campId),
		campStaffIdx2: index("camp_staff_idx_2").on(campStaff.staffId),
		campStaffIdx3: index("camp_staff_idx_3").on(campStaff.deletedAt),
		campStaffIdx4: index("camp_staff_idx_4").on(campStaff.createdAt),
		campStaffIdx5: index("camp_staff_idx_5").on(campStaff.updatedAt)
	})
);

export const selectCampStaffSchema = createSelectSchema(campStaff);
export const insertCampStaffSchema = createInsertSchema(campStaff);
export type CampStaff = typeof campStaff.$inferSelect;
export type CreateCampStaff = typeof campStaff.$inferInsert;
