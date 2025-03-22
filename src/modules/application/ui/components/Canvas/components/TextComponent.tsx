import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { assertIsTextComponent } from "../../../../domain/entities/Component/components/TextComponent";
import { ComponentActor } from "../../../../interactors/component";

type TextComponentProps = {
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
  },
});

export const TextComponent = memo(({ actor }: TextComponentProps) => {
  const context = useSelector(actor, (state) => state.context);
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));

  assertIsTextComponent(context);

  const styles = makeStyles({ isSelected, isHovering });

  return (
    <p
      className={styles.base()}
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
    </p>
  );
});
