import { DEFAULT_LAUNDRY_PRICE } from '$lib/utils/constant';
import { z } from 'zod';

export const campFormSchema = z
	.object({
		name: z.string().trim().min(1),
		fromDate: z.coerce.date(),
		toDate: z.coerce.date(),
		description: z.string().trim(),
		hasLaundry: z
			.enum(['on'])
			.transform(() => true)
			.optional(),
		laundryPrice: z.coerce.number().min(1).optional().default(DEFAULT_LAUNDRY_PRICE)
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

export type CampFormBody = z.input<typeof campFormSchema>;
export type CampFormResponse = z.infer<typeof campFormSchema>;
