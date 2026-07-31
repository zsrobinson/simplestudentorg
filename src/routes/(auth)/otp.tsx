import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRef, useState } from "react";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { authClient } from "~/lib/auth-client";

const OTP_REGEXP = /^\d{6}$/g;

export const Route = createFileRoute("/(auth)/otp")({
  validateSearch: z.object({ email: z.email().optional() }),
  beforeLoad: ({ search: { email } }) => {
    if (!email) throw redirect({ to: "/login" });
    return { email };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { email } = Route.useRouteContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = new FormData(e.target).get("otp");
    const schema = z.string().regex(OTP_REGEXP);
    const { data: otp, error: parseErr } = schema.safeParse(field);
    if (parseErr) {
      e.preventDefault();
      return setError("Please enter a valid otp.");
    }

    const { data, error } = await authClient.signIn.emailOtp({ email, otp });
    if (error) {
      e.preventDefault();
      return setError("Unable to verify code.");
    }

    console.log("data", data);

    await navigate({ to: "/" });
  };

  return (
    <main className="p-4 flex flex-col gap-4">
      <p>
        Please enter the verification code sent to your email address:{" "}
        <span className="font-semibold">{email}</span>.
      </p>

      <form onSubmit={onSubmit} className="flex gap-2" ref={formRef}>
        <InputOTP
          maxLength={6}
          name="otp"
          pattern={REGEXP_ONLY_DIGITS}
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button type="submit">Verify</Button>
        {error && <p className="text-destructive">{error}</p>}
      </form>
    </main>
  );
}
