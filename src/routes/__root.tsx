import { createRootRoute, Outlet, ReactNode, useMatches } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

const TITLE = "XBuilder";

export const Route = createRootRoute({
  component: Root,
  head: () => ({
    meta: [
      {
        title: TITLE,
      },
    ],
  }),
});

function Meta({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const meta = matches.at(-1)?.meta?.find((meta) => meta?.title || "");

  console.log(matches);

  useEffect(() => {
    document.title = [meta?.title, TITLE].filter(Boolean).join(" | ");
  }, [meta]);

  return children;
}

function Root() {
  return (
    <Meta>
      {/* <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className="w-1/2 mx-auto">
          <Input placeholder="Type your command here..." />
        </div>
      </header> */}
      {/* <HeadContent /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </Meta>
  );
}
