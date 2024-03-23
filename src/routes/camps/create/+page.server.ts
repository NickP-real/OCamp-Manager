import { DEFAULT_LAUNDRY_PRICE } from '$lib/utils/constant';
import { createCamp } from '@controller/camp-controller';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const createCampFormSchema = z
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

export async function load() {
	const form = await superValidate(zod(createCampFormSchema));

	return { form };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createCampFormSchema));
		console.log(form);
		if (!form.valid) return fail(400, { form });

		await createCamp(form.data);
		console.log('create camp success');
	}
};
