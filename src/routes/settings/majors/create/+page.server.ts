import { majorFormSchema } from '$lib/client/form/major-form';
import { createMajor } from '@controller/major-controller';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
	const form = await superValidate(zod(majorFormSchema));
	return { form };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(majorFormSchema));

		if (!form.valid) return fail(400, { form });

		await createMajor(form.data);
	}
};
