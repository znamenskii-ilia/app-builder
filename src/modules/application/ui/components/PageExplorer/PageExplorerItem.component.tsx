import { tv } from "tailwind-variants";
import { ComponentType } from "../../../domain/entities/Component/valueObjects/ComponentType";
import { ComponentIcon } from "../ComponentIcon/ComponentIcon";

export type PageExplorerItemProps = {
  children: React.ReactNode;
  componentName: string;
  componentType: ComponentType;
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
  },
  variants: {
    isSelected: {
      true: { name: "bg-zinc-400 text-white hover:bg-zinc-500", icon: "stroke-white" },
    },
    level: {
      0: { name: "pl-2" },
      1: { name: "pl-5" },
      2: { name: "pl-8" },
      3: { name: "pl-11" },
      4: { name: "pl-14" },
      5: { name: "pl-17" },
      6: { name: "pl-20" },
      7: { name: "pl-23" },
      8: { name: "pl-26" },
      9: { name: "pl-29" },
      10: { name: "pl-32" },
      11: { name: "pl-35" },
      12: { name: "pl-38" },
      13: { name: "pl-41" },
      14: { name: "pl-44" },
      15: { name: "pl-47" },
      16: { name: "pl-50" },
    },
  },
});

export const PageExplorerItem = ({
  children,
  componentName,
  componentType,
  level,
  isSelected,
  onHoverEnter,
  onHoverLeave,
  onSelect,
}: PageExplorerItemProps) => {
  const styles = makeStyles({
    isSelected,
    level: level as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16,
  });

  return (
    <div className={styles.base()}>
      <div
        className={styles.name()}
        tabIndex={0}
        onMouseOver={onHoverEnter}
        onMouseOut={onHoverLeave}
        onClick={onSelect}
      >
        <ComponentIcon componentType={componentType} />
        {componentName}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};
