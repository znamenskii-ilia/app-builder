import { createFileRoute } from "@tanstack/react-router";
import { ApplicationList } from "../../modules/applications/ui/components/ApplicationList";

export const Route = createFileRoute("/applications/")({
  component: RootPage,
});

function RootPage() {
  return (
    <div className="flex flex-col h-screen container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <ApplicationList />
    </div>
  );
}
