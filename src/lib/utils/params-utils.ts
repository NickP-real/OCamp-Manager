import { z } from "zod";

const searchParamsSchema = z.union([z.string().trim().min(1), z.number()]);

export const idSchema = searchParamsSchema.transform(Number);

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const paginationSchema = z.object({
	page: searchParamsSchema.transform(Number).optional().default(DEFAULT_PAGE),
	per_page: searchParamsSchema.transform(Number).optional().default(DEFAULT_PER_PAGE)
});

export const querySchema = z.union([z.string().trim(), z.number()]);

export const collectionParamsSchema = z
	.object({
		q: querySchema.optional()
	})
	.merge(paginationSchema);

export type CollectionParams = z.input<typeof collectionParamsSchema>;

export function createSearchParams(obj: Record<string, string | number | undefined>) {
	const stringifyObjectValues = Object.fromEntries(
		Object.entries(obj)
			.filter(([, value]) => value !== undefined)
			.map(([key, value]) => [key, value!.toString()])
	);

	return new URLSearchParams(stringifyObjectValues);
}

export function getSearchParamsFromCollectionParams(collectionParams?: CollectionParams) {
	const params = collectionParamsSchema.parse(collectionParams);
	return createSearchParams(params);
}
