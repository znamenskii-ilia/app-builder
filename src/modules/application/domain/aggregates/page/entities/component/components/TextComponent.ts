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
