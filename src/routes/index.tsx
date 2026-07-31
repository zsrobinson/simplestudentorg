import { createFileRoute } from "@tanstack/react-router";
import { getSession } from "~/lib/auth-functions";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getSession();
    return { ...session };
  },
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();

  return (
    <main className="p-4 flex flex-col gap-4">
      <p>Welcome to Simple Student Org!</p>
      {user ? (
        <p>You are currently logged in as {user.email}.</p>
      ) : (
        <p>You are not currently logged in.</p>
      )}
    </main>
  );
}
