import type { BaseComponent } from "./BaseComponent";
import type { Component } from "../Component";

export type RowComponent = BaseComponent & {
  component: "Row";
  props: {
    flex: number;
    direction: "row" | "column";
    align: "center" | "start" | "end" | "between";
    justify: "center" | "start" | "end" | "between" | "around";
    gap: "none" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
    padding: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };
};

export const newRowComponent = (id: string): RowComponent => ({
  id,
  component: "Row",
  props: {
    flex: 1,
    direction: "row",
    align: "start",
    justify: "start",
    gap: "none",
    padding: 2,
  },
  children: [],
});

export function assertIsRowComponent(component: Component): asserts component is RowComponent {
  if (component.component !== "Row") {
    throw new Error("Invalid component schema");
  }
}
