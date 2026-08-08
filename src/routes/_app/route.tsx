import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { sessionQuery } from "~/lib/auth-queries";
import { AppHeader } from "./-header";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(sessionQuery);
    if (!session) throw redirect({ to: "/" });
    return { ...session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full [&>header]:h-12 [&>div]:mt-12">
      <AppHeader />
      <Outlet />
    </main>
  );
}
