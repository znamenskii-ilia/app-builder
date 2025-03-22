import type {
  BoxComponent,
  ButtonComponent,
  HeadingComponent,
  ImageComponent,
  TextComponent,
} from "./components";

export type Component =
  | BoxComponent
  | ButtonComponent
  | HeadingComponent
  | TextComponent
  | ImageComponent;
