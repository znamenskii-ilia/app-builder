import { PropsWithChildren } from "react";

type PropertyGridProps = PropsWithChildren;

export const PropertyGrid = ({ children }: PropertyGridProps) => {
  return <div className="grid grid-cols-[40px_1fr] gap-2">{children}</div>;
};
