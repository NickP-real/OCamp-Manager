import type { CampFormBody } from "$lib/client/form/camp-form";

import * as campRepository from "@repositories/camp-repository";
import * as campMajorRepository from "@repositories/camp-major-repository";
import * as campStaffRepository from "@repositories/camp-staff-repository";

import * as campService from "@services/camp-service";

import type { CampMajor } from "@db/schema/camp-major";
import { type CampStaff, type CreateCampStaff, insertCampStaffSchema } from "@db/schema/camp-staff";
import { validateCreateCampRequest } from "$lib/validators/camp-validator";

import type { Camp } from "@db/schema/camp";
import type { CreateCampRequestDTO } from "$lib/dtos/camp-dto";

// const updateCampSchema = createCampSchema.partial();

// type UpdateCampBody = z.infer<typeof updateCampSchema>;
export type CampWithMajors = Camp & { campMajor: CampMajor[] };

export async function getAll() {
	return campRepository.getAll();
}

export async function getCampById(id: Camp["id"]) {
	const data = await campRepository.getCampWithCampMajorsById(id);

	return data.reduce((prev, { camp, camp_major }) => {
		if (!prev.id) prev = { ...camp, campMajor: [] };
		if (camp_major) prev.campMajor.push(camp_major);
		return prev;
	}, {} as CampWithMajors);
}

export async function createCamp(data: CreateCampRequestDTO) {
	const body = validateCreateCampRequest(data);
	await campRepository.createCamp(body);
}

export async function updateCampById(id: Camp["id"], data: CampFormBody): Promise<CampFormBody> {
	try {
		const { campMajors: majorData, ...campData } = data;

		const { camp, campMajors } = await campService.updateCamp({
			campId: id,
			campData: { ...campData, laundryPrice: campData.laundryPrice?.toString() ?? null },
			majorData,
			updateCampById: campRepository.updateCampById,
			updateCampMajorByCampId: campMajorRepository.updateCampMajorByCampId
		});

		return {
			...camp,
			campMajors,
			laundryPrice: camp.laundryPrice ? parseFloat(camp.laundryPrice) : undefined
		};
	} catch (error) {
		console.error(error);
		throw new Error("Update camp fail");
	}
}

export async function createCampStaff(data: CreateCampStaff[]) {
	try {
		const body = insertCampStaffSchema.array().parse(data);
		await campStaffRepository.createCampStaff(body);
	} catch (error) {
		console.log(error);
		throw new Error("Create camp staff fail");
	}
}

export async function updateCampStaff(campStaffId: CampStaff["id"], data: CreateCampStaff) {
	try {
		const body = insertCampStaffSchema.parse(data);
		await campStaffRepository.updateCampStaffById(campStaffId, body);
	} catch (error) {
		console.log(error);
		throw new Error("Update camp staff fail");
	}
}
