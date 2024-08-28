import type { CampFormBody } from "$lib/client/form/camp-form";
import {
	insertCampSchema,
	insertCampStaffSchema,
	type Camp,
	type CampMajor,
	type CreateCampStaff
} from "@db/schema/camps";
import type { z } from "zod";

// Repository
import * as campRepository from "@repository/camp-repository";
import * as campMajorRepository from "@repository/camp-major-repository";
import * as campStaffRepository from "@repository/camp-staff-repository";

// Services
import * as campService from "@service/camp-service";

const createCampSchema = insertCampSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});
// const updateCampSchema = createCampSchema.partial();
type CreateCampBody = z.infer<typeof createCampSchema>;
// type UpdateCampBody = z.infer<typeof updateCampSchema>;
export type CampWithMajors = Camp & { campMajor: CampMajor[] };

export async function getAllCamps() {
	return campRepository.getCamps();
}

export async function getCampById(id: number) {
	const data = await campRepository.getCampWithCampMajorsById(id);

	return data.reduce((prev, { camp, camp_major }) => {
		if (!prev.id) prev = { ...camp, campMajor: [] };
		if (camp_major) prev.campMajor.push(camp_major);
		return prev;
	}, {} as CampWithMajors);
}

export async function createCamp(data: CreateCampBody) {
	try {
		const body = createCampSchema.parse(data);
		await campRepository.createCamp(body);
	} catch (err) {
		console.log(err);
		throw new Error("Create camp fail");
	}
}

export async function updateCamp(id: number, data: CampFormBody): Promise<CampFormBody> {
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
		console.log(error);
		throw new Error("Update camp fail");
	}
}

export async function createCampStaff(data: CreateCampStaff) {
	try {
		const body = insertCampStaffSchema.parse(data);
		await campStaffRepository.createCampStaff(body);
	} catch (error) {
		console.log(error);
		throw new Error("Create camp staff fail");
	}
}

export async function updateCampStaff(campStaffId: number, data: CreateCampStaff) {
	try {
		const body = insertCampStaffSchema.parse(data);
		await campStaffRepository.updateCampStaffById(campStaffId, body);
	} catch (error) {
		console.log(error);
		throw new Error("Update camp staff fail");
	}
}
