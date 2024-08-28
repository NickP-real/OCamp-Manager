import { phoneSchema } from "./utils-form";
import { z } from "zod";

export const staffFormSchema = z.object({
	firstName: z.string().trim().min(1),
	lastName: z.string().trim().min(1),
	nickname: z.string().trim().min(1).optional(),
	phone: phoneSchema.optional(),
	birthday: z.date(),
	additionalInfo: z.string().trim().min(1).optional()
});

export type StaffFormSchema = typeof staffFormSchema;
