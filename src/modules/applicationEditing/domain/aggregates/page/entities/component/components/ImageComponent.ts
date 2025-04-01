import { BaseComponent } from "../BaseComponent";

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
