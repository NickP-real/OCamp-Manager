import { generateEntityId, entityTimestampColumns } from "../utils/entity-utils";
import { index, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

const TABLE_NAME = "camp_participant";

export const campParticipant = pgTable(
	TABLE_NAME,
	{
		id: varchar("id", { length: 24 })
			.primaryKey()
			.$defaultFn(() => {
				return generateEntityId(TABLE_NAME);
			}),
		campId: varchar("camp_id", { length: 24 }).notNull(),
		participantId: varchar("participant_id", { length: 24 }).notNull(),
		...entityTimestampColumns
	},
	(campParticipant) => ({
		campParticipantUnq1: unique("camp_participant_unq_1").on(
			campParticipant.campId,
			campParticipant.participantId
		),
		campParticipantIdx1: index("camp_participant_idx_1").on(campParticipant.campId),
		campParticipantIdx2: index("camp_participant_idx_2").on(campParticipant.participantId),
		campParticipantIdx3: index("camp_participant_idx_3").on(campParticipant.deletedAt),
		campParticipantIdx4: index("camp_participant_idx_4").on(campParticipant.createdAt),
		campParticipantIdx5: index("camp_participant_idx_5").on(campParticipant.updatedAt)
	})
);

export const selectCampParticipantSchema = createSelectSchema(campParticipant);
export const insertCampParticipantSchema = createInsertSchema(campParticipant);
export type CampParticipant = typeof campParticipant.$inferSelect;
export type CreateCampParticipant = typeof campParticipant.$inferInsert;
