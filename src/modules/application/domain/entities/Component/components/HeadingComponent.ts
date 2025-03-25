import type { Component } from "../Component";
import type { BaseComponent } from "../BaseComponent";

export type HeadingComponentLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingComponentAlign = "left" | "center" | "right";
export type HeadingComponentMargin = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingComponent = BaseComponent & {
  component: "Heading";
  props: {
    text: string;
    level: HeadingComponentLevel;
    align: HeadingComponentAlign;
    color: string;
    marginTop: HeadingComponentMargin;
    marginRight: HeadingComponentMargin;
    marginBottom: HeadingComponentMargin;
    marginLeft: HeadingComponentMargin;
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
    marginTop: 0 as HeadingComponentMargin,
    marginRight: 0 as HeadingComponentMargin,
    marginBottom: 0 as HeadingComponentMargin,
    marginLeft: 0 as HeadingComponentMargin,
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
