import { date, index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { entityTimestampColumns, generateEntityId } from "../utils/entity-utils";
import { sexEnum } from "./enums";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const TABLE_NAME = "participant";
export const participant = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		firstName: varchar("first_name", { length: 256 }).notNull(),
		lastName: varchar("last_name", { length: 256 }).notNull(),
		nickname: varchar("nickname", { length: 256 }),
		phone: varchar("phone", { length: 191 }),
		birthday: date("birthday", { mode: "date" }).notNull(),
		sex: sexEnum("sex").notNull(),
		additionalInfo: text("additional_info"),
		...entityTimestampColumns
	},
	(participant) => ({
		participantIdx1: index("participant_idx_1").on(participant.firstName),
		participantIdx2: index("participant_idx_2").on(participant.lastName),
		participantIdx3: index("participant_idx_3").on(participant.phone),
		participantIdx4: index("participant_idx_4").on(participant.deletedAt),
		participantIdx5: index("participant_idx_5").on(participant.createdAt),
		participantIdx6: index("participant_idx_6").on(participant.updatedAt)
	})
);

export const selectParticipantSchema = createSelectSchema(participant);
export const insertParticipantSchema = createInsertSchema(participant, {
	firstName: ({ firstName }) => firstName.trim().min(1),
	lastName: ({ lastName }) => lastName.trim().min(1)
});
export type Participant = typeof participant.$inferSelect;
export type CreateParticipant = typeof participant.$inferInsert;
