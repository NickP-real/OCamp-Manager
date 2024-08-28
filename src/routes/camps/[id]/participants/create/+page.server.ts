import { participantFormSchema } from "$lib/client/form/participant-form";
import { createCampParticipant } from "@controller/camp-participant-controller";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load() {
	const form = await superValidate(zod(participantFormSchema));

	return { form };
}

export const actions: Actions = {
	default: async ({ request, params: { id } }) => {
		if (!id) return fail(404, { message: "Not found" });
		const form = await superValidate(request, zod(participantFormSchema));

		if (!form.valid) return fail(400, { form });

		await createCampParticipant(+id, form.data);
		console.log("Create participant successful.");
	}
};
