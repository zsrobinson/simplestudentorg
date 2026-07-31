import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { authRelations } from "./auth-schema.ts";

export const db = drizzle(env.db, { relations: { ...authRelations } });
