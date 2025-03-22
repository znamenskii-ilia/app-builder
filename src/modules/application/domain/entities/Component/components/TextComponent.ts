import type { Component } from "../Component";
import type { BaseComponent } from "../BaseComponent";

export type TextComponent = BaseComponent & {
  component: "Text";
  props: {
    text: string;
  };
};

export const newTextComponent = (id: string): TextComponent => ({
  id,
  component: "Text",
  name: "Text",
  props: {
    text: "Lorem ipsum dolor sit amet",
  },
  children: [],
});

export function assertIsTextComponent(component: Component): asserts component is TextComponent {
  if (component.component !== "Text") {
    throw new Error("Invalid component schema");
  }
}
