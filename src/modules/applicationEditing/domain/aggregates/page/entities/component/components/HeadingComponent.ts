import type { BaseComponent } from "../BaseComponent";

export type HeadingComponentAlign = "left" | "center" | "right";

export type HeadingComponent = BaseComponent & {
  component: "Heading";
  props: {
    text: string;
    level: number;
    align: HeadingComponentAlign;
    color: string;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
};

export const newHeadingComponent = (id: string): HeadingComponent => ({
  id,
  component: "Heading",
  name: "Heading",
  props: {
    text: "Heading",
    level: 1,
    align: "left",
    color: "black",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  children: [],
});
