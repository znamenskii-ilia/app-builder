import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

type AppEntityExplorerItemProps = {
  title: string;
  to: string;
  isSelected?: boolean;
};

const makeStyles = tv({
  slots: {
    base: "block py-1 px-2 hover:bg-gray-200",
  },
  variants: {
    isSelected: {
      true: "bg-gray-100",
    },
  },
});

export const AppEntityExplorerItem = ({
  title,
  to,
  isSelected = false,
}: AppEntityExplorerItemProps) => {
  const styles = makeStyles({ isSelected });

  return (
    <Link to={to} className={styles.base()}>
      {title}
    </Link>
  );
};
