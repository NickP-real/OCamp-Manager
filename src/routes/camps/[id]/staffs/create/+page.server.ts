import { message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { campStaffSchema } from "$lib/client/form/camp-staff-form";
import { fail, type Actions } from "@sveltejs/kit";
import { createCampStaff } from "@controller/camp-controller";
import { getAllStaffs } from "@controller/staff-controller";

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(campStaffSchema));
	const staffs = getAllStaffs();

	return { form, staffs };
};

export const actions: Actions = {
	default: async ({ request, params: { id: campId } }) => {
		if (!campId) return fail(403, { message: "Not Allowed" });
		const form = await superValidate(request, zod(campStaffSchema));

		if (!form.valid) return fail(400, { form });
		await createCampStaff({ campId: +campId, ...form.data });

		return message(form, "Add staff to camp successful.");
	}
};
