import { env } from "$env/dynamic/private";
import { createDBInstance } from "./utils/db-instance-utils";

export const db = await createDBInstance(env.DATABASE_URL);
