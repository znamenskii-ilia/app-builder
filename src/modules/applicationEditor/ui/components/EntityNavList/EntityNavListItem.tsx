import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

type EntityNavListItemProps = {
  title: string;
  to: string;
  isSelected?: boolean;
};

const styles = tv({
  base: "flex items-center ml-1 p-1 pl-5 w-full",
  variants: {
    isSelected: {
      true: "bg-gray-100",
    },
  },
});

export const EntityNavListItem = ({ title, to, isSelected = false }: EntityNavListItemProps) => {
  return (
    <Link to={to} className={styles({ isSelected })}>
      {title}
    </Link>
  );
};
