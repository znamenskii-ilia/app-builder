import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../../../../common/ui/components/button";
import {
  assertIsButtonComponent,
  ButtonComponentSize,
} from "../../../../domain/entities/Component/components/ButtonComponent";
import { ComponentActor } from "../../../../interactors/component";

type ButtonComponentProps = {
  actor: ComponentActor;
};

const makeStyles = tv({
  base: "flex border bg-white",
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

export const ButtonComponent = memo(({ actor }: ButtonComponentProps) => {
  const context = useSelector(actor, (state) => state.context);
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));

  assertIsButtonComponent(context);

  const mapSizeToVariant = (size: ButtonComponentSize) => {
    switch (size) {
      case "small":
        return "sm";
      case "medium":
        return "default";
      case "large":
        return "lg";
      default: {
        const exhaustiveCheck: never = size;
        throw new Error(`Unknown button size: ${exhaustiveCheck}`);
      }
    }
  };

  const styles = makeStyles({ isSelected, isHovering });

  return (
    <Button
      className={styles}
      {...{
        size: mapSizeToVariant(context.props.size),
        variant: "outline",
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
    >
      {context.props.text}
    </Button>
  );
});
