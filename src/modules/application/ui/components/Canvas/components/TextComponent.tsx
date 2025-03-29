import { memo } from "react";
import { tv } from "tailwind-variants";
import type { TextComponent as TextComponentType } from "../../../../domain";

type TextComponentProps = {
  component: TextComponentType;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
};

const makeStyles = tv({
  slots: {
    base: "",
  },
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

export const TextComponent = memo(
  ({
    component,
    isSelected,
    isHighlighted,
    onMouseOver,
    onMouseOut,
    onClick,
  }: TextComponentProps) => {
    const styles = makeStyles({ isSelected, isHighlighted });

    return (
      <p
        className={styles.base()}
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
      </p>
    );
  },
);
