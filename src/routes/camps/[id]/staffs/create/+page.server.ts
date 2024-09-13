import { message, superValidate, type Infer } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { campStaffSchema, type CampStaffSchema } from "$lib/client/form/camp-staff-form";
import { fail, type Actions } from "@sveltejs/kit";
import { updateCampStaffs } from "@controllers/camp-controller";
import { getCampStaffsByCampId } from "@controllers/camp-staff-controller";

export const load: PageServerLoad = async ({ params: { id: campId } }) => {
	// if (!campId) return fail(400, { message: "Invalid Camp ID" });
	const campStaffs = await getCampStaffsByCampId(campId);
	const formData: Infer<CampStaffSchema> = {
		staffIds: campStaffs?.map(({ id }) => id) ?? []
	};
	const form = await superValidate(formData, zod(campStaffSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, params: { id: campId } }) => {
		if (!campId) return fail(400, { message: "Invalid Camp ID" });
		const form = await superValidate(request, zod(campStaffSchema));

		if (!form.valid) return fail(400, { form });
		await updateCampStaffs(form.data.staffIds.map((staffId) => ({ campId, staffId })));

		return message(form, "Add staff to camp successful.");
	}
};
