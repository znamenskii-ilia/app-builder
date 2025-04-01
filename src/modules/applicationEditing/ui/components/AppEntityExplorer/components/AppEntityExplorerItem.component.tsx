import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

import { Button } from "@/common/ui/components/button";
import { Trash2 } from "lucide-react";

type AppEntityExplorerItemProps = {
  title: string;
  to: string;
  isSelected?: boolean;
  onDelete?: () => void;
};

const makeStyles = tv({
  slots: {
    base: "flex items-center justify-between hover:bg-gray-200",
    link: "flex-1 py-1 px-2",
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
  onDelete,
}: AppEntityExplorerItemProps) => {
  const styles = makeStyles({ isSelected });

  return (
    <div className={styles.base()}>
      <Link to={to} className={styles.link()}>
        {title}
      </Link>
      <Button variant="ghost" size="icon-sm" onClick={onDelete}>
        <Trash2 width={16} height={16} />
      </Button>
    </div>
  );
};
