import { memo } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../../../../common/ui/components/button";
import type {
  ButtonComponentSize,
  ButtonComponent as ButtonComponentType,
} from "../../../../domain";

type ButtonComponentProps = {
  component: ButtonComponentType;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
};

const makeStyles = tv({
  base: "flex border bg-white",
  variants: {
    isHighlighted: {
      // true: "outline outline-1 outline-solid outline-amber-500",
      true: "shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
    isSelected: {
      true: "ring-2 ring-amber-500 shadow-[inset_0_0_0_1000px_rgba(245,158,11,0.3)]",
    },
  },
});

export const ButtonComponent = memo(
  ({
    component,
    isSelected,
    isHighlighted,
    onMouseOver,
    onMouseOut,
    onClick,
  }: ButtonComponentProps) => {
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
    const styles = makeStyles({ isSelected, isHighlighted });

    return (
      <Button
        className={styles}
        {...{
          size: mapSizeToVariant(component.props.size),
          variant: "outline",
        }}
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
      >
        {component.props.text}
      </Button>
    );
  },
);
