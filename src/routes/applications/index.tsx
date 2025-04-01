import { createFileRoute } from "@tanstack/react-router";
import { ApplicationListFragment } from "../../modules/applicationsManagement/ui/fragments/ApplicationList/ApplicationList.fragment";

export const Route = createFileRoute("/applications/")({
  component: RootPage,
});

function RootPage() {
  return (
    <div className="container mx-auto flex h-screen flex-col py-4">
      <h1 className="mb-4 text-2xl font-bold">Applications</h1>
      <ApplicationListFragment />
    </div>
  );
}
