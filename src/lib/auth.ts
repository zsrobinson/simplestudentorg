import { env } from "cloudflare:workers";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "~/db";
import { account, session, user, verification } from "~/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user, session, account, verification },
  }),

  // tanstackStartCookies should be last in the array, apparently
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const { messageId } = await env.EMAIL.send({
          to: email,
          from: "login@simplestudent.org",
          subject: "Your magic link for Simple Student Org",
          html: `<h1>Simple Student Org</h1>
            <p>To log in, follow this link:</p>
            <a href="${url}">${url}</a>`,
        });
        console.log("Send magic link email", { messageId });
      },
    }),
    tanstackStartCookies(),
  ],
});
