import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

type AppExplorerItemProps = {
  title: string;
  to: string;
  isSelected?: boolean;
};

const makeStyles = tv({
  slots: {
    base: "block ml-1 p-1 pl-5",
  },
  variants: {
    isSelected: {
      true: "bg-gray-100",
    },
  },
});

export const AppExplorerItem = ({ title, to, isSelected = false }: AppExplorerItemProps) => {
  const styles = makeStyles({ isSelected });

  return (
    <Link to={to} className={styles.base()}>
      {title}
    </Link>
  );
};
