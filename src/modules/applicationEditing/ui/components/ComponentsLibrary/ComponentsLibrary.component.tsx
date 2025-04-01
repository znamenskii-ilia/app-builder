import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type ComponentsLibraryProps = PropsWithChildren;

const makeStyles = tv({
  slots: {
    base: "flex flex-col gap-2",
  },
});

export const ComponentsLibrary = ({ children }: ComponentsLibraryProps) => {
  const styles = makeStyles();

  return <div className={styles.base()}>{children}</div>;
};
