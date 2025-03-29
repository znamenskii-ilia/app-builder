import { BaseComponent } from "../BaseComponent";

export type BoxComponentTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "aside";
export type BoxComponentDirection = "row" | "column";
export type BoxComponentWidthType = "full" | "fit-content" | "custom";
export type BoxComponentWidthUnit = "px" | "%";
export type BoxComponentHeight = "full" | "fit-content" | "custom";
export type BoxComponentAlign = "start" | "center" | "end" | "stretch";
export type BoxComponentJustify = "start" | "center" | "end" | "space-between" | "space-around";

export type BoxComponent = BaseComponent & {
  component: "Box";
  props: {
    tag: BoxComponentTag;
    direction: BoxComponentDirection;
    height: BoxComponentHeight;
    width: {
      unit: BoxComponentWidthUnit;
      value: number;
    };
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
  name: "Box",
  props: {
    tag: "div",
    direction: "column",
    height: "full",
    width: {
      unit: "px",
      value: 0,
    },
    align: "stretch",
    justify: "start",
    gap: 0,
    padding: 0,
    background: "white",
    border: 0,
  },
  children: [],
});
