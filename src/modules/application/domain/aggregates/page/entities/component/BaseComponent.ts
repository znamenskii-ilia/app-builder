import { ComponentType } from "../../valueObjects/ComponentType";

export type BaseComponent = {
  id: string;
  component: ComponentType;
  name: string;
  props: Record<string, unknown>;
  children: string[];
};
