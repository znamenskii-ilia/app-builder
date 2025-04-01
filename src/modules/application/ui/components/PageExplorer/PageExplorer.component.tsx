import { tv } from "tailwind-variants";

export type PageExplorerProps = {
  children: React.ReactNode;
};

const makeStyles = tv({
  slots: {
    base: "flex flex-col",
  },
});

export const PageExplorer = ({ children }: PageExplorerProps) => {
  const styles = makeStyles();

  return (
    <div className={styles.base()} role="tree" aria-label="Page explorer">
      <h3 className="mb-1 px-2">Page explorer</h3>
      {children}
    </div>
  );
};
