import { superValidate, type Infer } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
	participantFormSchema,
	type ParticipantFormSchema
} from '$lib/client/form/participant-form';

export const load: PageServerLoad = async ({ parent }) => {
	const { participant } = await parent();

	const formData: Infer<ParticipantFormSchema> = {
		...participant,
		phone: participant.phone ?? undefined
	};

	const form = await superValidate(formData, zod(participantFormSchema));

	return { form };
};
