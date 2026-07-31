import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { account, session, user, verification } from "~/db/auth-schema";
import { db } from "~/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user, session, account, verification },
  }),

  // tanstackStartCookies should be last in the array, apparently
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
        console.log("# MAGIC LINK");
        console.log("  - email:", email);
        console.log("  - token:", token);
        console.log("  - url:", url);
        console.log("  - metadata:", metadata);
        console.log("  - ctx:", ctx);
      },
    }),
    tanstackStartCookies(),
  ],
});
