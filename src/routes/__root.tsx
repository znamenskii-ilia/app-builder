import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className="w-1/2 mx-auto">
          <Input placeholder="Type your command here..." />
        </div>
      </header> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
