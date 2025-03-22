import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "@xstate/react";
import clsx, { ClassValue } from "clsx";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { assertIsBoxComponent } from "../../../../domain/entities/Component/components";
import { ComponentActor } from "../../../../interactors/component";
import { resolveComponent } from "../utils";

type BoxComponentProps = {
  pageChildren: Record<string, ComponentActor>;
  actor: ComponentActor;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const styles = tv({
  base: "flex flex-1 border",
  variants: {
    isHovering: {
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
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
    },
    border: {
      0: "border-0",
      1: "border-1",
      2: "border-2",
      3: "border-3",
    },
  },
});

export const BoxComponent = memo(({ pageChildren, actor }: BoxComponentProps) => {
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));
  const context = useSelector(actor, (state) => state.context);
  const { isOver, setNodeRef } = useDroppable({
    id: context.id,
  });

  assertIsBoxComponent(context);

  return (
    <div
      ref={setNodeRef}
      tabIndex={0}
      onMouseOver={(event) => {
        event.stopPropagation();
        actor.send({ type: "HOVER_ENTER" });
      }}
      onMouseOut={(event) => {
        event.stopPropagation();
        actor.send({ type: "HOVER_LEAVE" });
      }}
      onClick={(event) => {
        event.stopPropagation();
        actor.send({ type: "SELECT" });
      }}
      className={styles({
        isSelected,
        isHovering,
        isOver,
        direction: context.props.direction,
        align: context.props.align,
        justify: context.props.justify,
        padding: context.props.padding,
        gap: context.props.gap,
        border: context.props.border,
      })}
      style={{ backgroundColor: context.props.background }}
    >
      {context.children.map((childId) => resolveComponent(pageChildren, childId))}
    </div>
  );
});
