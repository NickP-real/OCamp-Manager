import { DEFAULT_LAUNDRY_PRICE } from '$lib/utils/constant';
import { z } from 'zod';

export const campFormSchema = z
	.object({
		name: z.string().trim().min(1),
		fromDate: z.date(),
		toDate: z.date(),
		description: z.string().trim().min(1),
		hasLaundry: z.boolean().optional().default(false),
		laundryPrice: z.coerce.number().min(1).optional().default(DEFAULT_LAUNDRY_PRICE),
		campMajors: z.object({ majorId: z.number() }).array()
	})
	.superRefine(({ fromDate, toDate }, ctx) => {
		if (fromDate > toDate) {
			ctx.addIssue({
				code: 'custom',
				message: 'Start date must come before end date',
				path: ['fromDate']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'End date must come before start date',
				path: ['toDate']
			});
		}
	})
	.transform((form) => {
		return {
			...form,
			laundryPrice: form.laundryPrice.toString()
		};
	});

export type CampFormSchema = typeof campFormSchema;
export type CampFormBody = z.input<typeof campFormSchema>;
