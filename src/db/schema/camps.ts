import {
	boolean,
	date,
	index,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	unique,
	uniqueIndex,
	varchar
} from "drizzle-orm/pg-core";
import { softDeleteColumns } from "../utils/columns-util";
import { staff, participant } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const camp = pgTable(
	"camp",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 256 }).unique().notNull(),
		fromDate: date("from_date", { mode: "date" }).notNull(),
		toDate: date("to_date", { mode: "date" }).notNull(),
		description: text("text").notNull(),
		hasLaundry: boolean("hasLaundry").notNull().default(false),
		laundryPrice: numeric("laundry_price", { precision: 10, scale: 2 }),
		...softDeleteColumns
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

export const major = pgTable(
	"major",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 256 }).notNull(),
		...softDeleteColumns
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

export const campMajor = pgTable(
	"camp_major",
	{
		id: serial("id").primaryKey(),
		campId: integer("camp_id")
			.notNull()
			.references(() => camp.id),
		majorId: integer("major_id")
			.notNull()
			.references(() => major.id)
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

export const campStaff = pgTable(
	"camp_staff",
	{
		id: serial("id").primaryKey(),
		campId: integer("camp_id")
			.notNull()
			.references(() => camp.id),
		staffId: integer("staff_id")
			.notNull()
			.references(() => staff.id),
		...softDeleteColumns
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

export const campParticipant = pgTable(
	"camp_participant",
	{
		id: serial("id").primaryKey(),
		campId: integer("camp_id")
			.notNull()
			.references(() => camp.id),
		participantId: integer("participant_id")
			.notNull()
			.references(() => participant.id),
		...softDeleteColumns
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
