import { ComponentType } from "./valueObjects/ComponentType";

export type BaseComponent = {
  id: string;
  component: ComponentType;
  props: Record<string, unknown>;
  children: string[];
};
