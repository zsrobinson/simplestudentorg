import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/$org/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { org } = Route.useParams();
  return <main className="p-8">Welcome to {org}'s dashboard!</main>;
}
