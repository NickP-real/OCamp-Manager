import { generateEntityId, entityTimestampColumns } from "../utils/entity-utils";
import { index, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "major";

export const major = pgTable(
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
	(major) => ({
		majorIdx1: uniqueIndex("major_idx_1").on(major.name),
		majorIdx2: index("major_idx_2").on(major.deletedAt),
		majorIdx3: index("major_idx_3").on(major.createdAt),
		majorIdx4: index("major_idx_4").on(major.updatedAt)
	})
);

export const selectMajorSchema = createSelectSchema(major);
export const insertMajorSchema = createInsertSchema(major, {
	name: ({ name }) => name.trim().min(1)
});
export type Major = typeof major.$inferSelect;
export type CreateMajor = typeof major.$inferInsert;
