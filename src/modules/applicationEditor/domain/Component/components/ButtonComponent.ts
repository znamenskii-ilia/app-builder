import type { ComponentEvent } from "../ComponentEvent";
import type { BaseComponent } from "./BaseComponent";
import type { Component } from "../Component";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonComponent = BaseComponent & {
  component: "Button";
  props: {
    text: string;
    size: ButtonSize;
    variant: "text" | "contained" | "outlined";
    color: "primary" | "secondary" | "destructive";
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

export function assertIsButtonComponent(
  component: Component,
): asserts component is ButtonComponent {
  if (component.component !== "Button") {
    throw new Error("Invalid component schema");
  }
}
