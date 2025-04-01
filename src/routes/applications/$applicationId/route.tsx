import { Application } from "@/modules/applicationEditing/domain";
import { AppNav } from "@/modules/applicationEditing/ui/components/AppNav";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/applications/$applicationId")({
  component: ApplicationPage,
  loader: async ({ params }) => {
    const application: Application = {
      id: params.applicationId,
      name: "Application 1",
      description: "Description 1",
      lastModified: 1717171717171,
      pages: [
        {
          id: "page-1",
          name: "Page 1",
          type: "page",
        },
        {
          id: "page-2",
          name: "Page 2",
          type: "page",
        },
      ],
      functions: [
        {
          id: "function-1",
          name: "Function 1",
          type: "function",
        },
      ],
      dataSources: [],
    };

    if (application.pages.length > 0) {
      redirect({
        to: `/applications/$applicationId/$entityType/$entityId`,
        params: {
          applicationId: params.applicationId,
          entityType: "pages",
          entityId: application.pages[0].id,
        },
      });
    }

    return { application };
  },
});

function ApplicationPage() {
  const { application } = Route.useLoaderData();

  return (
    <div className="flex h-full">
      <AppNav application={application} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
