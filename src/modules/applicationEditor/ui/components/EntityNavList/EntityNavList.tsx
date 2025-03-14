import { PropsWithChildren } from "react";

type EntityNavListProps = PropsWithChildren;

export const EntityNavList = ({ children }: EntityNavListProps) => {
  return <div>{children}</div>;
};
