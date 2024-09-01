import type { CreateCampRequestDTO } from "$lib/dtos/camp-dto";
import { createCampSchema } from "$lib/schemas/camp-schema";

export function validateCreateCampRequest(request: CreateCampRequestDTO): CreateCampRequestDTO {
	const { data, success, error } = createCampSchema.safeParse(request);
	if (!success) {
		throw error;
	}
	return data;
}
