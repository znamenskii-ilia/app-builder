import { tv } from "tailwind-variants";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const makeStyles = tv({
  slots: {
    base: "flex flex-col gap-2 p-3 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-gray-200",
    title: "",
  },
});

export const Section = ({ title, children }: SectionProps) => {
  const styles = makeStyles();

  return (
    <div className={styles.base()}>
      <h2 className={styles.title()}>{title}</h2>
      {children}
    </div>
  );
};
