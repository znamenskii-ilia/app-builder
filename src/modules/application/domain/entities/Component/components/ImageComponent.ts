import { BaseComponent } from "../BaseComponent";
import { Component } from "../Component";

export type ImageComponentWidth = "full" | "custom";

export type ImageComponent = BaseComponent & {
  component: "Image";
  props: {
    src: string;
    alt: string;
    widthType: ImageComponentWidth;
    customWidth?: number;
  };
};

export const newImageComponent = (id: string): ImageComponent => ({
  id,
  name: "Image",
  component: "Image",
  props: {
    src: "",
    alt: "",
    widthType: "full",
    customWidth: 50,
  },
  children: [],
});

export function assertIsImageComponent(component: Component): asserts component is ImageComponent {
  if (component.component !== "Image") {
    throw new Error("Component is not an Image");
  }
}
