import { campFormSchema } from "$lib/client/form/camp-form";
import { createCamp } from "@controllers/camp-controller";
import { getAllMajors } from "@controllers/major-controller";
import { fail, type Actions } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load() {
	const form = await superValidate(zod(campFormSchema));
	const majors = getAllMajors();

	return { form, majors };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(campFormSchema));
		console.log(form.valid);

		if (!form.valid) return fail(400, { form });

		await createCamp(form.data);
		console.log("Create camp success");

		return message(form, "Create camp success");
	}
};
