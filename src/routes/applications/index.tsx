import { createFileRoute } from "@tanstack/react-router";
import { ApplicationList } from "../../modules/applicationsManagement/ui/components/ApplicationList";

export const Route = createFileRoute("/applications/")({
  component: RootPage,
});

function RootPage() {
  return (
    <div className="container mx-auto flex h-screen flex-col py-4">
      <h1 className="mb-4 text-2xl font-bold">Applications</h1>
      <ApplicationList />
    </div>
  );
}
