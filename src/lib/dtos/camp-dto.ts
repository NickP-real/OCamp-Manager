import type { createCampSchema } from "$lib/schemas/camp-schema";
import type { Camp } from "@db/schema/camp";
import type { z } from "zod";

export type CreateCampRequestDTO = z.infer<typeof createCampSchema>;

export type CampResponseDTO = Camp[];
