import { createFileRoute } from "@tanstack/react-router";

const IndexPage = () => {
  return <div>Hello World</div>;
};

export const Route = createFileRoute("/")({
  component: IndexPage,
});
