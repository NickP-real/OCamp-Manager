import { getStaffById, updateStaffById } from "@controller/staff-controller";
import type { PageServerLoad, Actions } from "./$types";
import { message, superValidate, type Infer } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { staffFormSchema, type StaffFormSchema } from "$lib/client/form/staff-form";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params: { id } }) => {
	const staff = await getStaffById(id);
	if (!staff) error(404, { message: "Staff not found" });

	const formData: Infer<StaffFormSchema> = {
		...staff,
		nickname: staff.nickname ?? undefined,
		phone: staff.phone ?? undefined,
		additionalInfo: staff.additionalInfo ?? undefined
	};
	const form = await superValidate(formData, zod(staffFormSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, params: { id } }) => {
		const form = await superValidate(request, zod(staffFormSchema));

		if (!form.valid) return fail(400, { form });

		await updateStaffById(id, form.data);
		console.log("Update staff successful.");

		return message(form, "Update staff successful.");
	}
};
