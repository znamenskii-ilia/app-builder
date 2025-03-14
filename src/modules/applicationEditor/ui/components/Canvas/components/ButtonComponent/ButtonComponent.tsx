import { useSelector } from "@xstate/react";
import { memo } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../../../../../common/ui/components/button";
import {
  assertIsButtonComponent,
  ButtonSize,
} from "../../../../../domain/Component/components/ButtonComponent";
import { ComponentActor } from "../../../../../interactors/component";

type ButtonComponentProps = {
  actor: ComponentActor;
};

const makeStyles = tv({
  base: "flex border bg-white",
  variants: {
    isSelected: {
      true: "ring-2 ring-pink-500",
    },
    isHovering: {
      true: "ring-2 ring-pink-200",
    },
  },
});

export const ButtonComponent = memo(({ actor }: ButtonComponentProps) => {
  const context = useSelector(actor, (state) => state.context);
  const isHovering = useSelector(actor, (state) => state.matches("hover"));
  const isSelected = useSelector(actor, (state) => state.matches("selected"));

  assertIsButtonComponent(context);

  const mapSizeToVariant = (size: ButtonSize) => {
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
      onMouseEnter={() => actor.send({ type: "HOVER_ENTER" })}
      onMouseLeave={() => actor.send({ type: "HOVER_LEAVE" })}
      onClick={(event) => {
        event.stopPropagation();
        actor.send({ type: "SELECT" });
      }}
    >
      {context.props.text}
    </Button>
  );
});
