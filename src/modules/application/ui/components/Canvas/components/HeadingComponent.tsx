import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { assertIsHeadingComponent } from "../../../../domain/entities/Component/components/HeadingComponent";
import { ComponentActor } from "../../../../interactors/component";

type HeadingComponentProps = {
  actor: ComponentActor;
};

const makeStyles = tv({
  slots: {
    base: "",
  },
  variants: {
    isHovering: {
      // true: "outline outline-1 outline-solid outline-amber-500",
      true: "shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
    isSelected: {
      true: "ring-2 ring-amber-500 shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
    level: {
      1: "text-4xl font-bold",
      2: "text-3xl font-bold",
      3: "text-2xl font-bold",
      4: "text-xl font-bold",
      5: "text-lg font-bold",
      6: "text-base font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
});

export const HeadingComponent = memo(({ actor }: HeadingComponentProps) => {
  const context = useSelector(actor, (state) => state.context);
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));

  assertIsHeadingComponent(context);

  const Component = `h${context.props.level}` as const;

  const styles = makeStyles({ isSelected, isHovering });

  return (
    <Component
      className={styles.base({
        level: context.props.level,
        align: context.props.align,
      })}
      style={{ color: context.props.color }}
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
    >
      {context.props.text}
    </Component>
  );
});
