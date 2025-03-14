import { useSelector } from "@xstate/react";
import clsx, { ClassValue } from "clsx";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { assertIsRowComponent } from "../../../../../domain/Component/components/RowComponent";
import { resolveComponent } from "../../utils";
import { ComponentActor } from "../../../../../interactors/component";

type RowComponentProps = {
  pageChildren: Record<string, ComponentActor>;
  actor: ComponentActor;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const styles = tv({
  base: "flex flex-1 border bg-white",
  variants: {
    isSelected: {
      true: "ring-2 ring-pink-500",
    },
    isHovering: {
      true: "[&:not(:has(*:hover))]:hover:ring-2 [&:not(:has(*:hover))]:hover:ring-pink-200",
    },
    align: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
      between: "items-between",
    },
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    padding: {
      0: "p-0",
      1: "p-1",
      2: "p-2",
      3: "p-3",
      4: "p-4",
      5: "p-5",
      6: "p-6",
    },
  },
});

export const RowComponent = memo(({ pageChildren, actor }: RowComponentProps) => {
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));
  const context = useSelector(actor, (state) => state.context);

  assertIsRowComponent(context);

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => actor.send({ type: "HOVER_ENTER" })}
      onMouseLeave={() => actor.send({ type: "HOVER_LEAVE" })}
      onClick={(e) => {
        e.stopPropagation();
        actor.send({ type: "SELECT" });
      }}
      // items-center items-start items-end items-between items-around
      // p-0 p-1 p-2 p-3 p-4 p-5 p-6
      // flex-1
      className={styles({
        isSelected,
        isHovering,
        align: context.props.align,
        justify: context.props.justify,
        padding: context.props.padding,
      })}
    >
      {context.children.map((childId) => resolveComponent(pageChildren, childId))}
    </div>
  );
});
