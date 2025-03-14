import { createFileRoute } from "@tanstack/react-router";
import { Application } from "../../modules/applications/domain";
import { ApplicationList } from "../../modules/applications/ui/components/ApplicationList";

export const Route = createFileRoute("/applications/")({
  component: RootPage,
});

const applications: Application[] = [
  {
    id: "1",
    name: "Nebula Dashboard",
    description: "Building responsive web applications using React and TypeScript",
    lastModified: Date.now(),
    pages: [],
  },
  {
    id: "2",
    name: "Quantum Forge",
    description: "Developing full stack applications with Node.js and React",
    lastModified: Date.now(),
    pages: [],
  },
  {
    id: "3",
    name: "Aurora Canvas",
    description: "Creating user-centered designs for web and mobile applications",
    lastModified: Date.now(),
    pages: [],
  },
  {
    id: "4",
    name: "Titan Pipeline",
    description: "Managing CI/CD pipelines and cloud infrastructure",
    lastModified: Date.now(),
    pages: [],
  },
  {
    id: "5",
    name: "Cerebro Analytics",
    description: "Analyzing data and building machine learning models",
    lastModified: Date.now(),
    pages: [],
  },
  {
    id: "6",
    name: "Nexus Strategy",
    description: "Leading product development and strategy",
    lastModified: Date.now(),
    pages: [],
  },
];

function RootPage() {
  return (
    <div className="flex flex-col h-screen container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <ApplicationList applications={applications} />
    </div>
  );
}
