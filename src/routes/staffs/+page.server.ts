import { getAllStaffs } from '@controller/staff-controller';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const staffs = getAllStaffs();

	return { staffs };
};
