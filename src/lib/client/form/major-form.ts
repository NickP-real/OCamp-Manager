import { z } from 'zod';

export const majorFormSchema = z.object({
	name: z.string().trim().min(1)
});

export type MajorFormSchema = typeof majorFormSchema;
export type MajorFormBody = z.input<typeof majorFormSchema>;
export type MajorFormResponse = z.infer<typeof majorFormSchema>;
