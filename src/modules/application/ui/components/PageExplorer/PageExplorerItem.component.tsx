import { tv } from "tailwind-variants";
import { ComponentIcon } from "../ComponentIcon/ComponentIcon";

export type PageExplorerItemProps = {
  children: React.ReactNode;
  componentName: string;
  level: number;
  isSelected: boolean;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  onSelect: () => void;
};

const makeStyles = tv({
  slots: {
    base: "",
    name: "flex items-center gap-1 px-2 py-1 cursor-pointer transition-colors text-sm hover:bg-zinc-200",
    icon: "",
  },
  variants: {
    isSelected: {
      true: { name: "bg-zinc-400 text-white hover:bg-zinc-500", icon: "stroke-white" },
    },
    level: {
      0: { name: "pl-2" },
      1: { name: "pl-6" },
      2: { name: "pl-10" },
      3: { name: "pl-14" },
      4: { name: "pl-18" },
      5: { name: "pl-22" },
      6: { name: "pl-26" },
      7: { name: "pl-30" },
      8: { name: "pl-34" },
      9: { name: "pl-38" },
      10: { name: "pl-42" },
      11: { name: "pl-46" },
      12: { name: "pl-50" },
      13: { name: "pl-54" },
      14: { name: "pl-58" },
      15: { name: "pl-62" },
      16: { name: "pl-66" },
    },
  },
});

export const PageExplorerItem = ({
  children,
  componentName,
  level,
  isSelected,
  onHoverEnter,
  onHoverLeave,
  onSelect,
}: PageExplorerItemProps) => {
  const styles = makeStyles({ isSelected, level });

  return (
    <div className={styles.base()}>
      <div
        className={styles.name()}
        tabIndex={0}
        onMouseOver={onHoverEnter}
        onMouseOut={onHoverLeave}
        onClick={onSelect}
      >
        <ComponentIcon className={styles.icon()} componentType={componentName} />
        {componentName}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};
