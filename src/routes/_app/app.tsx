import { createFileRoute, redirect } from "@tanstack/react-router";
import { getOrgsQuery } from "~/lib/org-queries";
import { raise } from "~/lib/utils";

export const Route = createFileRoute("/_app/app")({
  beforeLoad: async ({ context }) => {
    const orgs = await context.queryClient.ensureQueryData(getOrgsQuery);
    const first = orgs.at(0) ?? raise(redirect({ to: "/new" }));
    throw redirect({ to: "/$org", params: { org: first.slug } });
  },
});
