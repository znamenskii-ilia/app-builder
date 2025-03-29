import { faker } from "@faker-js/faker";

import { BaseComponent } from "./BaseComponent";
import { BoxComponent, ButtonComponent } from "./components";

export const makeBaseComponent = (component: Partial<BaseComponent>): BaseComponent => ({
  id: faker.string.nanoid(3),
  name: faker.lorem.word(),
  component: "Box",
  props: {},
  children: [],
  ...component,
});

export const makeBoxComponent = (component: Partial<BoxComponent>): BoxComponent => ({
  ...makeBaseComponent({ component: "Box", ...component }),
  component: "Box",
  name: faker.lorem.word(),
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
  ...component,
});

export const makeButtonComponent = (component: Partial<ButtonComponent>): ButtonComponent => ({
  ...makeBaseComponent({ component: "Button", ...component }),
  component: "Button",
  name: faker.lorem.word(),
  props: {
    text: faker.lorem.word(),
    size: faker.helpers.arrayElement(["small", "medium", "large"]),
    variant: faker.helpers.arrayElement(["contained", "outlined", "text"]),
    color: faker.helpers.arrayElement(["primary", "secondary", "destructive"]),
    disabled: false,
    leftIcon: undefined,
    rightIcon: undefined,
    ...component.props,
  },
  events: {},
  ...component,
});
