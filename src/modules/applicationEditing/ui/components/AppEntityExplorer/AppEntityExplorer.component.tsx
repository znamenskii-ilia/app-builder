import { PropsWithChildren } from "react";

type AppEntityExplorerProps = PropsWithChildren;

export const AppEntityExplorer = ({ children }: AppEntityExplorerProps) => {
  return <div>{children}</div>;
};
