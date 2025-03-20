import { PropsWithChildren } from "react";

type AppExplorerProps = PropsWithChildren;

export const AppExplorer = ({ children }: AppExplorerProps) => {
  return <div>{children}</div>;
};
