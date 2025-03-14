import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/applications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
