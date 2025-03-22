import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type PropertyGridProps = PropsWithChildren;

const makeStyles = tv({
  slots: {
    base: "grid grid-cols-[70px_1fr] auto-rows-[30px] gap-2",
  },
});

export const PropertyGrid = ({ children }: PropertyGridProps) => {
  const styles = makeStyles();

  return <div className={styles.base()}>{children}</div>;
};
