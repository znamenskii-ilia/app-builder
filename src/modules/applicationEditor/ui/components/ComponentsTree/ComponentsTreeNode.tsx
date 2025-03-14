import { tv } from "tailwind-variants";

export type ComponentsTreeProps = {
  children: React.ReactNode;
  componentName: string;
  level: 0 | 1 | 2 | 3 | 4;
  isHovering: boolean;
  isSelected: boolean;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  onSelect: () => void;
};

const styles = tv({
  base: "px-2 cursor-pointer",
  variants: {
    isHovering: { true: "bg-zinc-100" },
    isSelected: { true: "bg-zinc-300" },
    level: {
      0: "pl-0",
      1: "pl-4",
      2: "pl-8",
      3: "pl-12",
      4: "pl-16",
    },
  },
});

export const ComponentsTreeNode = ({
  children,
  componentName,
  level,
  isHovering,
  isSelected,
  onHoverEnter,
  onHoverLeave,
  onSelect,
}: ComponentsTreeProps) => {
  return (
    <div tabIndex={0} onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
      <div tabIndex={0} onClick={onSelect} className={styles({ isHovering, isSelected, level })}>
        {componentName}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};
