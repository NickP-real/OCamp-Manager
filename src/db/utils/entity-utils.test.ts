import { isCuid } from "@paralleldrive/cuid2";
import { generateEntityId } from "./entity-utils";

describe("entity utils", () => {
	test("generateEntityId", () => {
		const result = generateEntityId("entity");
		expect(result.length).toEqual(24);
		expect(isCuid(result)).toEqual(true);
	});
});
