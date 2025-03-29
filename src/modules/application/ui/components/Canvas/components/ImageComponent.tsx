import { memo } from "react";
import { tv } from "tailwind-variants";
import type { ImageComponent as ImageComponentType } from "../../../../domain";

type ImageComponentProps = {
  component: ImageComponentType;
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
    widthType: {
      full: "w-full",
      custom: "",
    },
  },
});

export const ImageComponent = memo(
  ({
    component,
    isSelected,
    isHighlighted,
    onMouseOver,
    onMouseOut,
    onClick,
  }: ImageComponentProps) => {
    const styles = makeStyles({ isSelected, isHighlighted });

    return (
      <img
        src={component.props.src || "https://placehold.co/600x400"}
        alt={component.props.alt}
        className={styles.base({
          widthType: component.props.widthType,
        })}
        style={{
          width:
            component.props.widthType === "custom" ? `${component.props.customWidth}%` : "auto",
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
      />
    );
  },
);
