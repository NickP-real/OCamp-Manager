import { db, type DB } from "@db/index";
import type { Camp, CreateCamp } from "@db/schema/camp";
import type { CampMajor, CreateCampMajor } from "@db/schema/camp-major";

type UpdateCampArgs = {
	campId: Camp["id"];
	campData: CreateCamp;
	majorData: { majorId: string }[];
	updateCampById: (id: Camp["id"], body: CreateCamp, tx?: DB) => Promise<Camp>;
	updateCampMajorByCampId: (
		id: CampMajor["id"],
		body: CreateCampMajor[],
		tx?: DB
	) => Promise<CampMajor[]>;
};

export async function updateCamp(args: UpdateCampArgs) {
	const { campId, campData, majorData, updateCampById, updateCampMajorByCampId } = args;

	return await db.transaction(async (tx) => {
		const body = {
			...campData,
			laundryPrice: campData.laundryPrice?.toString() ?? null
		};
		const camp = await updateCampById(campId, body, tx);

		const campMajorData: CreateCampMajor[] = majorData.map((major) => ({
			campId,
			majorId: major.majorId
		}));
		const campMajors = await updateCampMajorByCampId(campId, campMajorData, tx);

		return { camp, campMajors };
	});
}
