import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_ORG } from "~/lib/constants";

export const Route = createFileRoute("/_app/app")({
  beforeLoad: () => {
    throw redirect({ to: "/$org", params: { org: DEFAULT_ORG } });
  },
});
