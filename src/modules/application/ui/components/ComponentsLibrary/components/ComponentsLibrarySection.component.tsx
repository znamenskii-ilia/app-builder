import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type ComponentsLibrarySectionProps = PropsWithChildren<{
  title: string;
}>;

const makeStyles = tv({
  slots: {
    base: "flex flex-col",
    title: "mb-1",
    content: "grid grid-cols-2 gap-2",
  },
});

export const ComponentsLibrarySection = ({ title, children }: ComponentsLibrarySectionProps) => {
  const styles = makeStyles();

  return (
    <div className={styles.base()}>
      <h3 className={styles.title()}>{title}</h3>
      <div className={styles.content()}>{children}</div>
    </div>
  );
};
