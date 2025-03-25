import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { ComponentActor } from "../../../../application/interactors/component";
import { assertIsHeadingComponent } from "../../../../domain/entities/Component/components/HeadingComponent";

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
      2: "text-2xl font-bold",
      3: "text-xl font-bold",
      4: "text-lg font-bold",
      5: "text-base font-bold",
      6: "text-sm font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    marginTop: {
      1: "mt-2",
      2: "mt-4",
      3: "mt-8",
      4: "mt-16",
      5: "mt-32",
      6: "mt-64",
    },
    marginRight: {
      1: "mr-2",
      2: "mr-4",
      3: "mr-8",
      4: "mr-16",
      5: "mr-32",
      6: "mr-64",
    },
    marginBottom: {
      1: "mb-2",
      2: "mb-4",
      3: "mb-8",
      4: "mb-16",
      5: "mb-32",
      6: "mb-64",
    },
    marginLeft: {
      1: "ml-2",
      2: "ml-4",
      3: "ml-8",
      4: "ml-16",
      5: "ml-32",
      6: "ml-64",
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
        marginTop: context.props.marginTop,
        marginRight: context.props.marginRight,
        marginBottom: context.props.marginBottom,
        marginLeft: context.props.marginLeft,
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
