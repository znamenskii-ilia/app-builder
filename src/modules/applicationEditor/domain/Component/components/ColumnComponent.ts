import type { Component } from "../Component";
import type { BaseComponent } from "./BaseComponent";

export type ColumnComponent = BaseComponent & {
  component: "Column";
  props: {
    flex: number;
    align: "center" | "start" | "end" | "between" | "around";
    justify: "center" | "start" | "end" | "between" | "around";
    padding: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };
};

export const newColumnComponent = (id: string): ColumnComponent => ({
  id,
  component: "Column",
  props: {
    flex: 1,
    align: "start",
    justify: "start",
    padding: 2,
  },
  children: [],
});

export function assertIsColumnComponent(
  component: Component,
): asserts component is ColumnComponent {
  if (component.component !== "Column") {
    throw new Error("Invalid component schema");
  }
}
