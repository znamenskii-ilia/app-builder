import { createFileRoute, redirect } from "@tanstack/react-router";

const IndexPage = () => {
  return <div>Hello World</div>;
};

export const Route = createFileRoute("/")({
  component: IndexPage,
  loader: () => {
    redirect({
      to: "/applications",
      throw: true,
    });
  },
});
