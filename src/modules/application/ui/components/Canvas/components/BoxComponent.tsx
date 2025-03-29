import { useDroppable } from "@dnd-kit/core";
import clsx, { ClassValue } from "clsx";
import { memo, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import type { BoxComponent as BoxComponentType } from "../../../../domain";

type BoxComponentProps = PropsWithChildren<{
  component: BoxComponentType;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}>;

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const styles = tv({
  base: "flex flex-1 border",
  variants: {
    isHighlighted: {
      // true: "[&:not(:has(*:hover))]:hover:ring-1 [&:not(:has(*:hover))]:hover:ring-amber-500",
      true: "shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
    isSelected: {
      true: "ring-2 ring-amber-500 shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
    isOver: {
      true: "ring-2 ring-lime-500",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    align: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
      "space-between": "justify-between",
      "space-around": "justify-around",
    },
    padding: {
      0: "p-0",
      1: "p-1",
      2: "p-2",
      3: "p-4",
      4: "p-8",
      5: "p-16",
      6: "p-32",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-4",
      4: "gap-8",
      5: "gap-16",
      6: "gap-32",
    },
    border: {
      0: "border-0",
      1: "border-1",
      2: "border-2",
      3: "border-3",
    },
  },
});

export const BoxComponent = memo(
  ({
    children,
    component,
    isSelected,
    isHighlighted,
    onMouseOver,
    onMouseOut,
    onClick,
  }: BoxComponentProps) => {
    const { isOver, setNodeRef } = useDroppable({
      id: component.id,
    });

    const Component = component.props.tag || "div";

    return (
      <Component
        ref={setNodeRef}
        tabIndex={0}
        onMouseOver={(event) => {
          event.stopPropagation();
          onMouseOver();
        }}
        onMouseOut={(event) => {
          event.stopPropagation();
          onMouseOut();
        }}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        className={styles({
          isSelected,
          isHighlighted,
          isOver,
          direction: component.props.direction,
          align: component.props.align,
          justify: component.props.justify,
          padding: component.props.padding,
          gap: component.props.gap,
          border: component.props.border,
        })}
        style={{ backgroundColor: component.props.background }}
      >
        {children}
      </Component>
    );
  },
);
