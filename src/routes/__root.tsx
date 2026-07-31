import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { getSession } from "~/lib/auth-functions";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const session = await getSession();
    return { ...session };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="max-w-4xl mx-auto">
        <Header />

        {children}

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const { session, user } = Route.useRouteContext();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between border-b p-4">
      <h1 className="text-2xl font-semibold">Simple Student Org</h1>

      <div className="flex gap-2">
        {session ? (
          <>
            <Button
              onClick={async () => {
                await authClient.signOut();
                await navigate({ to: "/" });
              }}
              variant="ghost"
            >
              Logout
            </Button>

            <div
              className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full"
              title={user?.email}
            >
              <UserIcon />
            </div>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
