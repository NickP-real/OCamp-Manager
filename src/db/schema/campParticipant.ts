import { entityTimestampColumns } from "@db/utils/columns-util";
import { index, integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const campParticipant = pgTable(
	"camp_participant",
	{
		id: serial("id").primaryKey(),
		campId: integer("camp_id").notNull(),
		participantId: integer("participant_id").notNull(),
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
