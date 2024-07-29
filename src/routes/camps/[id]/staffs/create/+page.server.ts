import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { campStaffSchema } from '$lib/client/form/camp-staff-form';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(campStaffSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, params: { id: campId } }) => {
		const form = await superValidate(request, zod(campStaffSchema));

		if (!form.valid) return fail(400, { form });

		return message(form, 'Add staff to camp successful.');
	}
};
