import { insertParticipantSchema } from "@db/schema/users";
import { z } from "zod";
import { phoneSchema } from "./utils-form";

export const participantFormSchema = insertParticipantSchema
	.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true })
	.merge(
		z.object({
			phone: phoneSchema.optional(),
			birthday: z.coerce.date()
		})
	);

// export const participantFormSchema = z.object({
// 	firstName: z.string().trim().min(1),
// 	lastName: z.string().trim().min(1),
// 	nickname: z.string().trim().min(1).optional(),
// 	phone: z.string().regex(phoneRegex).optional(),
// 	birthday: z.coerce.date(),
// 	sex: z.enum(sexEnum.enumValues),
// 	additionalInfo: z.string().trim().optional()
// });

export type ParticipantFormSchema = typeof participantFormSchema;
export type ParticipantFormBody = z.input<typeof participantFormSchema>;
export type ParticipantFormResponse = z.infer<typeof participantFormSchema>;
