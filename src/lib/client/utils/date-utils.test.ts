import { formatDate, formatDateInput } from "./date-util";

describe("date utils", () => {
	const input = new Date("2024-09-09 15:00:00");
	test("formatDate", () => {
		const result = formatDate(input);
		expect(result).toEqual("09 September 2024");
	});
	test("formatDateInput", () => {
		const result = formatDateInput(input);
		expect(result).toEqual("2024-09-09");
	});
});
