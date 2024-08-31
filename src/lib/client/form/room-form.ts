import { selectParticipantSchema } from "@db/schema/participant";
import { selectStaffSchema } from "@db/schema/staff";
import { z } from "zod";

export const roomSchema = z.object({
	roomName: z.string().trim().min(1),
	participants: selectParticipantSchema.array(),
	staffs: selectStaffSchema.array()
});

export type RoomSchema = typeof roomSchema;
