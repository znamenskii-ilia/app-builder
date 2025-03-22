import type { Component } from "../Component";
import type { BaseComponent } from "../BaseComponent";

export type HeadingComponent = BaseComponent & {
  component: "Heading";
  props: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    align: "left" | "center" | "right";
    color: string;
  };
};

export const newHeadingComponent = (id: string): HeadingComponent => ({
  id,
  component: "Heading",
  name: "Heading",
  props: {
    text: "Heading",
    level: 1,
    align: "left",
    color: "black",
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
