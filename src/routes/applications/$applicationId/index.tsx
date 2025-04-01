import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/applications/$applicationId/")({
  component: ApplicationPage,
});

function ApplicationPage() {
  return null;
}
