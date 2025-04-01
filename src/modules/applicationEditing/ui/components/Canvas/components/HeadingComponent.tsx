import { memo } from "react";
import { tv } from "tailwind-variants";

import type { HeadingComponent as HeadingComponentType } from "@/modules/applicationEditing/domain";

type HeadingComponentProps = {
  component: HeadingComponentType;
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

export const HeadingComponent = memo(
  ({
    component,
    isSelected,
    isHighlighted,
    onMouseOver,
    onMouseOut,
    onClick,
  }: HeadingComponentProps) => {
    const Component = `h${component.props.level as 1 | 2 | 3 | 4 | 5 | 6}` as const;
    const styles = makeStyles({ isSelected, isHighlighted });

    return (
      <Component
        className={styles.base({
          level: component.props.level as 1 | 2 | 3 | 4 | 5 | 6,
          align: component.props.align,
          marginTop: component.props.marginTop as 1 | 2 | 3 | 4 | 5 | 6,
          marginRight: component.props.marginRight as 1 | 2 | 3 | 4 | 5 | 6,
          marginBottom: component.props.marginBottom as 1 | 2 | 3 | 4 | 5 | 6,
          marginLeft: component.props.marginLeft as 1 | 2 | 3 | 4 | 5 | 6,
        })}
        style={{ color: component.props.color }}
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
      </Component>
    );
  },
);
