// import { sql } from "drizzle-orm";
// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const todos = sqliteTable("orgs", {
//   id: integer({ mode: "number" }).primaryKey({
//     autoIncrement: true,
//   }),
//   name: text().notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`(unixepoch())`,
//   ),
// });
