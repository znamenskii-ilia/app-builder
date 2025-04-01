import { ComponentEvent } from "../../../valueObjects/ComponentEvent";
import type { BaseComponent } from "../BaseComponent";

export type ButtonComponentSize = "small" | "medium" | "large";
export type ButtonComponentVariant = "text" | "contained" | "outlined";
export type ButtonComponentColor = "primary" | "secondary" | "destructive";

export type ButtonComponent = BaseComponent & {
  component: "Button";
  props: {
    text: string;
    size: ButtonComponentSize;
    variant: ButtonComponentVariant;
    color: ButtonComponentColor;
    disabled: boolean;
    leftIcon: string | undefined;
    rightIcon: string | undefined;
  };
  events: {
    click?: ComponentEvent;
  };
};

export const newButtonComponent = (id: string): ButtonComponent => ({
  id,
  component: "Button",
  name: "Button",
  props: {
    text: "Button",
    size: "medium",
    variant: "contained",
    color: "primary",
    disabled: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
  events: {
    click: undefined,
  },
  children: [],
});
