import type { Component } from "../Component";
import type { BaseComponent } from "./BaseComponent";

export type HeadingComponent = BaseComponent & {
  component: "Heading";
  props: {
    text: string;
  };
};

export const newHeadingComponent = (id: string): HeadingComponent => ({
  id,
  component: "Heading",
  props: {
    text: "Heading",
  },
  children: [],
});

export function assertIsHeadingComponent(
  component: Component,
): asserts component is HeadingComponent {
  if (component.component !== "Heading") {
    throw new Error("Invalid component schema");
  }
}
