import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "./-sidebar";

export const Route = createFileRoute("/_app/$org")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="[&>aside]:w-48 [&>main]:ml-48">
      <Sidebar />
      <Outlet />
    </div>
  );
}
