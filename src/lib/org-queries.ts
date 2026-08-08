import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { org } from "~/db/schema";

const getOrgs = createServerFn({ method: "GET" }).handler(async () => {
  return await db.select().from(org);
});

export const getOrgsQuery = queryOptions({
  queryKey: ["org"],
  queryFn: getOrgs,
});
