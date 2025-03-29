import { useDroppable } from "@dnd-kit/core";
import { tv } from "tailwind-variants";

const makeStyles = tv({
  slots: {
    base: "absolute left-0 top-[-1px] w-full h-1/4 bg-blue-200 border-t-2 border-amber-200 invisible z-2",
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

type PageExplorerTopDropLineProps = {
  componentId: string;
  isHidden: boolean;
};

export const PageExplorerTopDropLine = ({
  componentId,
  isHidden,
}: PageExplorerTopDropLineProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${componentId}-top`,
    data: {
      componentId,
      position: "before",
    },
  });

  const styles = makeStyles();

  return <div ref={setNodeRef} className={styles.base({ isOver, isHidden })} />;
};
