import { tv } from "tailwind-variants";
import { ComponentType } from "../../../domain/entities";
import { ComponentIcon } from "../ComponentIcon/ComponentIcon";

export type PageExplorerItemProps = {
  children: React.ReactNode;
  componentName: ComponentType;
  level: 0 | 1 | 2 | 3 | 4;
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
