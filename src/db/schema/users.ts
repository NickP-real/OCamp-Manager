import {
	date,
	index,
	integer,
	pgTable,
	serial,
	text,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';
import { softDeleteColumns } from '../utils/columns-util';
import { sexEnum } from './enums';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const participant = pgTable(
	'participant',
	{
		id: serial('id').primaryKey(),
		firstName: varchar('first_name', { length: 256 }).notNull(),
		lastName: varchar('last_name', { length: 256 }).notNull(),
		nickname: varchar('nickname', { length: 256 }),
		phone: varchar('phone', { length: 191 }),
		birthday: date('birthday', { mode: 'date' }).notNull(),
		sex: sexEnum('sex').notNull(),
		additionalInfo: text('additional_info'),
		...softDeleteColumns
	},
	(participant) => ({
		participantIdx1: index('participant_idx_1').on(participant.firstName),
		participantIdx2: index('participant_idx_2').on(participant.lastName),
		participantIdx3: index('participant_idx_3').on(participant.phone),
		participantIdx4: index('participant_idx_4').on(participant.deletedAt),
		participantIdx5: index('participant_idx_5').on(participant.createdAt),
		participantIdx6: index('participant_idx_6').on(participant.updatedAt)
	})
);

export const selectParticipantSchema = createSelectSchema(participant);
export const insertParticipantSchema = createInsertSchema(participant, {
	firstName: ({ firstName }) => firstName.trim().min(1),
	lastName: ({ lastName }) => lastName.trim().min(1)
});
export type Participant = typeof participant.$inferSelect;
export type CreateParticipant = typeof participant.$inferInsert;

export const staff = pgTable(
	'staff',
	{
		id: serial('id').primaryKey(),
		firstName: varchar('first_name', { length: 256 }).notNull(),
		lastName: varchar('last_name', { length: 256 }).notNull(),
		nickname: varchar('nickname', { length: 256 }),
		phone: varchar('phone', { length: 191 }),
		birthday: date('birthday', { mode: 'date' }).notNull(),
		additionalInfo: text('additional_info'),
		...softDeleteColumns
	},
	(staff) => ({
		staffIdx1: index('staff_idx_1').on(staff.firstName),
		staffIdx2: index('staff_idx_2').on(staff.lastName),
		staffIdx3: index('staff_idx_3').on(staff.phone),
		staffIdx4: index('staff_idx_4').on(staff.deletedAt),
		staffIdx5: index('staff_idx_5').on(staff.createdAt),
		staffIdx6: index('staff_idx_6').on(staff.updatedAt)
	})
);

export const selectStaffSchema = createSelectSchema(staff);
export const insertStaffSchema = createInsertSchema(staff, {
	firstName: ({ firstName }) => firstName.trim().min(1),
	lastName: ({ lastName }) => lastName.trim().min(1)
});
export type Staff = typeof staff.$inferSelect;
export type CreateStaff = typeof staff.$inferInsert;

export const staffAccount = pgTable(
	'staff_account',
	{
		id: serial('id').primaryKey(),
		staffId: integer('staff_id')
			.unique()
			.notNull()
			.references(() => staff.id),
		email: varchar('email', { length: 256 }).notNull(),
		password: varchar('password', { length: 256 }).notNull(),
		...softDeleteColumns
	},
	(staffAccount) => ({
		staffAccountIdx1: uniqueIndex('staff_account_idx_1').on(staffAccount.staffId),
		staffAccountIdx2: uniqueIndex('staff_account_idx_2').on(staffAccount.email),
		staffAccountIdx3: index('staff_account_idx_3').on(staffAccount.deletedAt),
		staffAccountIdx4: index('staff_account_idx_4').on(staffAccount.createdAt),
		staffAccountIdx5: index('staff_account_idx_5').on(staffAccount.updatedAt)
	})
);

export const selectStaffAccountSchema = createSelectSchema(staffAccount);
export const insertStaffAccountSchema = createInsertSchema(staffAccount, {
	email: ({ email }) => email.email(),
	password: ({ password }) => password.trim().min(8)
});
export type StaffAccount = typeof staffAccount.$inferSelect;
export type CreateStaffAccount = typeof staffAccount.$inferInsert;
