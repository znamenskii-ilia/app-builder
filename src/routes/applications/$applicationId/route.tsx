import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useActor } from "@xstate/react";

import { applicationLogic } from "@/modules/applicationEditing/application/interactors/application/application.logic";
import { AppNavFragment } from "@/modules/applicationEditing/ui/fragments/AppNav.fragment";

export const Route = createFileRoute("/applications/$applicationId")({
  component: ApplicationPage,
});

function ApplicationPage() {
  const { applicationId } = Route.useParams();
  const [applicationSnapshot, _, applicationActor] = useActor(applicationLogic, {
    input: {
      applicationId,
    },
  });

  if (applicationSnapshot.matches("loading")) {
    return <div>Application is loading...</div>;
  }

  return (
    <div className="flex h-full">
      <AppNavFragment applicationActor={applicationActor} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
