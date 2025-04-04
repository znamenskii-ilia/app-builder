import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";

import { ApplicationWizardLogic } from "@/modules/applicationsManagement/interactions/applicationWizard/applicationWizard.logic";
import { NewApplicationFragment } from "@/modules/applicationsManagement/ui/fragments/NewApplication.fragment";

export const Route = createFileRoute("/applications/new")({
  component: NewApplicationPage,
  head: () => ({
    meta: [
      {
        title: "Applications",
      },
    ],
  }),
});

function NewApplicationPage() {
  const applicationWizardActor = useActor(ApplicationWizardLogic);

  return (
    <div className="container mx-auto flex h-screen flex-col py-4">
      <h1 className="mb-4 text-2xl font-bold">New Application</h1>

      <NewApplicationFragment actor={applicationWizardActor[2]} />
    </div>
  );
}
