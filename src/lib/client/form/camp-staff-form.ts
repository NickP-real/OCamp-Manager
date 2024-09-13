import { z } from "zod";

export const campStaffSchema = z.object({
	staffIds: z.string().array()
});

export type CampStaffSchema = typeof campStaffSchema;
