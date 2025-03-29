import { useDndContext, useDraggable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";
import type { ComponentType } from "../../../../domain";
import { ComponentIcon } from "../../ComponentIcon/ComponentIcon";
import { PageExplorerBottomDropLine } from "./PageExplorerBottomDropLine.component";
import { PageExplorerDropOn } from "./PageExplorerDropOn.component";
import { PageExplorerTopDropLine } from "./PageExplorerTopDropLine.component";

export type PageExplorerItemProps = {
  children: React.ReactNode;
  componentId: string;
  componentName: string;
  componentType: ComponentType;
  level: number;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onSelect: () => void;
};

const makeStyles = tv({
  slots: {
    base: "relative",
    name: "relative flex items-center gap-1 px-2 py-1 cursor-pointer transition-colors text-sm select-none",
  },
  variants: {
    isSelected: {
      true: {
        name: "bg-zinc-400 text-white",
        icon: "stroke-white",
      },
    },
    isHighlighted: {
      true: {
        name: "bg-zinc-300",
      },
    },
    isDragging: {
      true: { name: "z-1000" },
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
  componentId,
  componentName,
  componentType,
  level,
  isSelected,
  isHighlighted,
  onMouseOver,
  onMouseOut,
  onSelect,
}: PageExplorerItemProps) => {
  const isRootBox = componentType === "Box" && level === 0;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: componentId,
    data: {
      componentType,
    },
    disabled: isRootBox,
  });
  const dnd = useDndContext();
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const styles = makeStyles({
    isSelected,
    isHighlighted,
    isDragging: isDragging,
    level: level as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16,
  });

  return (
    <div className={styles.base()}>
      <div
        className={styles.name()}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onMouseOver={() => {
          if (dnd.active) return;
          onMouseOver();
        }}
        onMouseOut={() => {
          if (dnd.active) return;
          onMouseOut();
        }}
        onClick={onSelect}
      >
        <ComponentIcon componentType={componentType} />
        {componentName}

        {/* Primitive components can be dropped on a box */}
        {componentType === "Box" && (
          <PageExplorerDropOn componentId={componentId} isHidden={isDragging} />
        )}
        {!isRootBox && <PageExplorerTopDropLine componentId={componentId} isHidden={isDragging} />}
        {!isRootBox && (
          <PageExplorerBottomDropLine componentId={componentId} isHidden={isDragging} />
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};
