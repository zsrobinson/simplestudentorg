import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-8">Create a new org here.</div>;
}
