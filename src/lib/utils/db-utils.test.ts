import { ifEmptyThrowError } from "./db-utils";

describe("db utils", () => {
	describe("ifEmptyThrowError", () => {
		const testCases = [
			{
				name: "empty",
				input: [],
				errorMessage: "Error message",
				shouldError: true
			},
			{
				name: "exists",
				input: [{ name: "John" }],
				shouldError: false
			}
		];

		it.each(testCases)("$name", ({ input, errorMessage, shouldError }) => {
			if (shouldError) {
				expect(() => {
					ifEmptyThrowError(input, errorMessage);
				}).toThrow(errorMessage);
			} else {
				expect(() => {
					ifEmptyThrowError(input);
				}).not.toThrow();
			}
		});
	});
});
