import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Input } from "../common/ui/components/input";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="w-1/2 mx-auto">
          <Input placeholder="Type your command here..." />
        </div>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
