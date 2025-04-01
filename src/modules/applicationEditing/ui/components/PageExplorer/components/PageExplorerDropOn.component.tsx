import { useDroppable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";

const makeStyles = tv({
  slots: {
    base: "absolute left-0 top-[10px] bottom-[10px] w-full bg-red-200 invisible z-1",
  },
  variants: {
    isOver: {
      false: { base: "" },
    },
    isHidden: {
      false: { base: "" },
    },
  },
  compoundVariants: [
    {
      isOver: true,
      isHidden: false,
      class: {
        base: "visible",
      },
    },
  ],
});

type PageExplorerDropOnProps = {
  componentId: string;
  isHidden: boolean;
};

export const PageExplorerDropOn = ({ componentId, isHidden }: PageExplorerDropOnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${componentId}-inside`,
    data: {
      componentId,
      position: "inside",
    },
  });

  const styles = makeStyles();

  return <div ref={setNodeRef} className={styles.base({ isOver, isHidden })} />;
};
