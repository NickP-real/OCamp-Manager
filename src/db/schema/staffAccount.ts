import { entityTimestampColumns } from "@db/utils/columns-util";
import { index, integer, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const staffAccount = pgTable(
	"staff_account",
	{
		id: serial("id").primaryKey(),
		staffId: integer("staff_id").unique().notNull(),
		email: varchar("email", { length: 256 }).notNull(),
		password: varchar("password", { length: 256 }).notNull(),
		...entityTimestampColumns
	},
	(staffAccount) => ({
		staffAccountIdx1: uniqueIndex("staff_account_idx_1").on(staffAccount.staffId),
		staffAccountIdx2: uniqueIndex("staff_account_idx_2").on(staffAccount.email),
		staffAccountIdx3: index("staff_account_idx_3").on(staffAccount.deletedAt),
		staffAccountIdx4: index("staff_account_idx_4").on(staffAccount.createdAt),
		staffAccountIdx5: index("staff_account_idx_5").on(staffAccount.updatedAt)
	})
);

export const selectStaffAccountSchema = createSelectSchema(staffAccount);
export const insertStaffAccountSchema = createInsertSchema(staffAccount, {
	email: ({ email }) => email.email(),
	password: ({ password }) => password.trim().min(8)
});
export type StaffAccount = typeof staffAccount.$inferSelect;
export type CreateStaffAccount = typeof staffAccount.$inferInsert;
