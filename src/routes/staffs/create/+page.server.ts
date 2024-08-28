import { fail, message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { staffFormSchema } from "$lib/client/form/staff-form";
import type { Actions } from "@sveltejs/kit";
import { createStaff } from "@controller/staff-controller";

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(staffFormSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(staffFormSchema));

		if (!form.valid) return fail(400, { form });

		await createStaff(form.data);
		console.log("Create staff successful");

		return message(form, "Create staff successful");
	}
};
