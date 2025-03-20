import { BaseComponent } from "../BaseComponent";
import { Component } from "../Component";

export type BoxComponentDirection = "row" | "column";
export type BoxComponentWidth = "full" | "fit-content" | "custom";
export type BoxComponentHeight = "full" | "fit-content" | "custom";
export type BoxComponentAlign = "start" | "center" | "end" | "stretch";
export type BoxComponentJustify = "start" | "center" | "end" | "space-between" | "space-around";

export type BoxComponent = BaseComponent & {
  component: "Box";
  props: {
    direction: BoxComponentDirection;
    height: BoxComponentHeight;
    width: BoxComponentWidth;
    align: BoxComponentAlign;
    justify: BoxComponentJustify;
    gap: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    padding: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    background: string;
    border: 0 | 1 | 2 | 3;
  };
};

export const newBoxComponent = (id: string): BoxComponent => ({
  id,
  component: "Box",
  props: {
    direction: "column",
    height: "full",
    width: "full",
    align: "stretch",
    justify: "start",
    gap: 2,
    padding: 2,
    background: "white",
    border: 1,
  },
  children: [],
});

export function assertIsBoxComponent(component: Component): asserts component is BoxComponent {
  if (component.component !== "Box") {
    throw new Error("Invalid component schema");
  }
}
