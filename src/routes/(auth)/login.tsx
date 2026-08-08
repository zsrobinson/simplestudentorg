import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { authClient } from "~/lib/auth-client";
import { getSession } from "~/lib/auth-functions";
import { IndexHeader } from "../-header";

export const Route = createFileRoute("/(auth)/login")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) throw redirect({ to: "/" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = new FormData(e.target).get("email");
    const { data: email, error: parseErr } = z.email().safeParse(field);
    if (parseErr) {
      e.preventDefault();
      return setError("Please enter a valid email.");
    }

    const req = { email, type: "sign-in" as const };
    const { data, error } = await authClient.emailOtp.sendVerificationOtp(req);
    if (error || data.success === false) {
      e.preventDefault();
      return setError("Unable to send verification email.");
    }

    await navigate({ to: "/otp", search: { email } });
  };

  return (
    <>
      <IndexHeader />
      <main className="flex flex-col gap-4 p-4">
        <p>
          To login or create an account, provide your email below and we'll send
          you a code.
        </p>

        <form onSubmit={onSubmit} className="flex gap-2">
          <InputGroup className="max-w-xs">
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupInput type="email" name="email" placeholder="Email" />
          </InputGroup>

          <Button type="submit">Submit</Button>
          {error && <p className="text-destructive">{error}</p>}
        </form>
      </main>
    </>
  );
}
