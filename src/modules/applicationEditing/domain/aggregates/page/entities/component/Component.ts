import {
  newBoxComponent,
  newButtonComponent,
  newHeadingComponent,
  newImageComponent,
  newTextComponent,
  type BoxComponent,
  type ButtonComponent,
  type HeadingComponent,
  type ImageComponent,
  type TextComponent,
} from "./components";
import { ComponentType } from "../../valueObjects/ComponentType";

export type Component =
  | BoxComponent
  | ButtonComponent
  | HeadingComponent
  | TextComponent
  | ImageComponent;

export const createComponent = (id: string, componentType: ComponentType): Component => {
  switch (componentType) {
    case "Box":
      return newBoxComponent(id);
    case "Text":
      return newTextComponent(id);
    case "Heading":
      return newHeadingComponent(id);
    case "Button":
      return newButtonComponent(id);
    case "Image":
      return newImageComponent(id);
    default: {
      const exhaustiveCheck: never = componentType;

      throw new Error(`Unknown component type: ${exhaustiveCheck}`);
    }
  }
};
