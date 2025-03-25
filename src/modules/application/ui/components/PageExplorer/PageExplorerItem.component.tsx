import { useDndContext, useDraggable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";
import { ComponentType } from "../../../domain/entities/Component/valueObjects/ComponentType";
import { ComponentIcon } from "../ComponentIcon/ComponentIcon";
import { PageExplorerBottomDropLine } from "./PageExplorerBottomDropLine";
import { PageExplorerDropOn } from "./PageExplorerDropOn";
import { PageExplorerTopDropLine } from "./PageExplorerTopDropLine";

export type PageExplorerItemProps = {
  children: React.ReactNode;
  componentId: string;
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
    base: "relative",
    name: "relative flex items-center gap-1 px-2 py-1 cursor-pointer transition-colors text-sm",
  },
  variants: {
    isSelected: {
      true: {
        name: "bg-zinc-400 text-white hover:bg-zinc-500",
        icon: "stroke-white",
      },
    },
    isDndActive: {
      true: { name: "" },
      false: { name: "hover:bg-zinc-300" },
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
  onHoverEnter,
  onHoverLeave,
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
    isDndActive: Boolean(dnd.active),
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
          onHoverEnter();
        }}
        onMouseOut={() => {
          if (dnd.active) return;
          onHoverLeave();
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
