import { useDroppable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";

const makeStyles = tv({
  slots: {
    base: "absolute left-0 bottom-[-1px] w-full h-1/4 bg-green-200 border-b-2 border-amber-200 invisible z-2",
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

type PageExplorerBottomDropLineProps = {
  componentId: string;
  isHidden: boolean;
};

export const PageExplorerBottomDropLine = ({
  componentId,
  isHidden,
}: PageExplorerBottomDropLineProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${componentId}-bottom`,
    data: {
      componentId,
      position: "after",
    },
  });

  const styles = makeStyles();

  return <div ref={setNodeRef} className={styles.base({ isOver, isHidden })} />;
};
