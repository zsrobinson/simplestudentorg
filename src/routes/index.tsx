import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
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
    <div className="p-8 max-w-4xl m-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Simple Student Org</h1>
      {user ? (
        <>
          <p>You are currently logged in as {user.email}.</p>
          <Button onClick={() => authClient.signOut()}>Sign Out</Button>
        </>
      ) : (
        <>
          <p>You are not currently logged in.</p>
          <MagicLinkForm />
        </>
      )}
    </div>
  );
}

function MagicLinkForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button
        onClick={async () => {
          await authClient.signIn.magicLink({ email });
        }}
      >
        Submit
      </Button>
    </div>
  );
}
