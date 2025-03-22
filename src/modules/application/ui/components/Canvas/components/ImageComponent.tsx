import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { assertIsImageComponent } from "../../../../domain/entities/Component/components/ImageComponent";
import { ComponentActor } from "../../../../interactors/component";

type ImageComponentProps = {
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
    widthType: {
      full: "w-full",
      custom: "",
    },
  },
});

export const ImageComponent = memo(({ actor }: ImageComponentProps) => {
  const context = useSelector(actor, (state) => state.context);
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));

  assertIsImageComponent(context);

  const styles = makeStyles({ isSelected, isHovering });

  return (
    <img
      src={context.props.src || "https://placehold.co/600x400"}
      alt={context.props.alt}
      className={styles.base({
        widthType: context.props.widthType,
      })}
      style={{
        width: context.props.widthType === "custom" ? `${context.props.customWidth}%` : "auto",
      }}
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
    />
  );
});
