import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { roomSchema } from "$lib/client/form/room-form";

export const load = async () => {
	const form = await superValidate(zod(roomSchema));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(roomSchema));

		console.log(form.valid, form.data);

		if (!form.valid) return fail(400, { form });

		return message(form, "Create room successful");
	}
};
