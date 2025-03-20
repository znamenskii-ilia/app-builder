import { useDraggable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";

type ComponentsLibraryItemProps = {
  type: string;
  title: string;
};

const makeStyles = tv({
  slots: {
    base: "block box-border w-full p-2 border rounded-md cursor-grab touch-none bg-white",
  },
  variants: {
    isOver: {
      true: { base: "bg-green-200" },
    },
  },
});

export const ComponentsLibraryItem = ({ type, title }: ComponentsLibraryItemProps) => {
  const { attributes, listeners, setNodeRef, transform, over, isDragging } = useDraggable({
    id: type,
    data: {
      componentType: type,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const styles = makeStyles({ isOver: !!over && isDragging });

  return (
    <button className={styles.base()} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {title}
    </button>
  );
};
