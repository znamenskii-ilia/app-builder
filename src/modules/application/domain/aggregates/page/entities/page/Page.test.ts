import { describe, expect, it, test } from "vitest";

import { makeBoxComponent, makeButtonComponent } from "../component/Component.factory";
import {
  addComponent,
  deleteComponent,
  findParentWithChild,
  getComponent,
  getRootComponent,
  moveComponent,
  renamePage,
} from "./Page";
import { makePage } from "./Page.factory";

describe("renamePage", () => {
  test("should rename the page", () => {
    const page = makePage({
      name: "My Page",
    });

    expect(renamePage(page, "New Page")).toEqual({
      ...page,
      name: "New Page",
    });
  });
});

describe("addComponent", () => {
  test("when the target component is not found, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root" }),
      },
    });

    expect(addComponent(page, "Button", "non-existent-id")).toBe(page);
  });

  test("when the target component is the root component, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root" }),
      },
    });

    const newPage = addComponent(page, "Button", "__root");
    const newComponentId =
      newPage.children["__root"].children[newPage.children["__root"].children.length - 1];

    expect(newPage.children["__root"].children).toEqual([newComponentId]);
    expect(newPage.children[newComponentId]).toMatchObject({
      id: newComponentId,
      component: "Button",
    });
  });

  it("should add the new component as the last child of the target component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-1"] }),
        "box-1": makeBoxComponent({ id: "box-1" }),
      },
    });

    const newPage = addComponent(page, "Box", "box-1");
    const newComponentId =
      newPage.children["box-1"].children[newPage.children["box-1"].children.length - 1];

    expect(newPage.children["box-1"].children).toEqual([newComponentId]);
    expect(newPage.children[newComponentId]).toMatchObject({
      id: newComponentId,
      component: "Box",
    });
  });
});

describe("getComponent", () => {
  test("when the component is not found, it should return undefined", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root" }),
      },
    });

    expect(getComponent(page, "non-existent-id")).toBeNull();
  });

  test("when the component is found, it should return the component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(getComponent(page, "box-2")).toEqual(page.children["box-2"]);
  });
});

describe("deleteComponent", () => {
  test("when the component is not found, it should return the same page", () => {
    const page = makePage({
      children: {},
    });

    expect(deleteComponent(page, "non-existent-id")).toBe(page);
  });

  test("when the component has no children, it should delete only the component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(deleteComponent(page, "box-2")).toEqual({
      ...page,
      children: {
        __root: {
          ...page.children["__root"],
          children: [],
        },
      },
    });
  });

  test("when the component has children, it should delete the component and its children", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({
          id: "box-2",
          children: ["box-3", "box-4"],
        }),
        "box-3": makeBoxComponent({ id: "box-3", children: ["box-5"] }),
        "box-4": makeBoxComponent({ id: "box-4" }),
        "box-5": makeBoxComponent({ id: "box-5" }),
      },
    });

    expect(deleteComponent(page, "box-2")).toEqual({
      ...page,
      children: {
        __root: {
          ...page.children["__root"],
          children: [],
        },
      },
    });
  });
});

describe("moveComponent", () => {
  test("when the component is the root component, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-1"] }),
        "box-1": makeBoxComponent({ id: "box-1" }),
      },
    });

    expect(moveComponent(page, "__root", "box-1", "inside")).toBe(page);
  });

  test("when the component is not found, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-1"] }),
        "box-1": makeBoxComponent({ id: "box-1" }),
      },
    });

    expect(moveComponent(page, "non-existent-id", "__root", "inside")).toBe(page);
  });

  test("when the target component is not found, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(moveComponent(page, "box-2", "non-existent-id", "inside")).toBe(page);
  });

  test("when move component to itself, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(moveComponent(page, "box-2", "box-2", "inside")).toBe(page);
  });

  test("when move root component, it should return the same page", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(moveComponent(page, "__root", "box-2", "inside")).toBe(page);
  });

  describe("when the position is inside", () => {
    it("should return the same page if the target component is not a box", () => {
      const page = makePage({
        children: {
          __root: makeBoxComponent({
            id: "__root",
            children: ["box-2", "box-3"],
          }),
          "box-2": makeBoxComponent({ id: "box-2", children: ["button-1"] }),
          "box-3": makeBoxComponent({ id: "box-3", children: ["button-2"] }),
          "button-1": makeButtonComponent({ id: "button-1" }),
          "button-2": makeButtonComponent({ id: "button-2" }),
        },
      });

      expect(moveComponent(page, "button-1", "button-2", "inside")).toBe(page);
    });

    it("should move the component", () => {
      const page = makePage({
        children: {
          __root: makeBoxComponent({
            id: "__root",
            children: ["box-2", "box-3"],
          }),
          "box-2": makeBoxComponent({ id: "box-2", children: ["button-1"] }),
          "box-3": makeBoxComponent({ id: "box-3" }),
          "button-1": makeButtonComponent({ id: "button-1" }),
        },
      });

      expect(moveComponent(page, "button-1", "box-3", "inside")).toEqual({
        ...page,
        children: {
          __root: page.children["__root"],
          "box-2": {
            ...page.children["box-2"],
            children: [],
          },
          "box-3": {
            ...page.children["box-3"],
            children: ["button-1"],
          },
          "button-1": page.children["button-1"],
        },
      });
    });
  });

  it("when the position is before, it should move the component before the target component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({
          id: "__root",
          children: ["box-2", "box-3"],
        }),
        "box-2": makeBoxComponent({ id: "box-2", children: ["button-1"] }),
        "box-3": makeBoxComponent({ id: "box-3", children: ["button-2"] }),
        "button-1": makeButtonComponent({ id: "button-1" }),
        "button-2": makeButtonComponent({ id: "button-2" }),
      },
    });

    expect(moveComponent(page, "button-1", "button-2", "before")).toEqual({
      ...page,
      children: {
        __root: page.children["__root"],
        "box-2": {
          ...page.children["box-2"],
          children: [],
        },
        "box-3": {
          ...page.children["box-3"],
          children: ["button-1", "button-2"],
        },
        "button-1": page.children["button-1"],
        "button-2": page.children["button-2"],
      },
    });
  });

  it("when the position is after, it should move the component after the target component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({
          id: "__root",
          children: ["box-2", "box-3"],
        }),
        "box-2": makeBoxComponent({ id: "box-2", children: ["button-1"] }),
        "box-3": makeBoxComponent({ id: "box-3", children: ["button-2"] }),
        "button-1": makeButtonComponent({ id: "button-1" }),
        "button-2": makeButtonComponent({ id: "button-2" }),
      },
    });

    expect(moveComponent(page, "button-1", "button-2", "after")).toEqual({
      ...page,
      children: {
        __root: page.children["__root"],
        "box-2": {
          ...page.children["box-2"],
          children: [],
        },
        "box-3": {
          ...page.children["box-3"],
          children: ["button-2", "button-1"],
        },
        "button-1": page.children["button-1"],
        "button-2": page.children["button-2"],
      },
    });
  });
});

describe("findParentWithChild", () => {
  test("when the component is not found, it should return undefined", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(findParentWithChild(page, "non-existent-id")).toBeUndefined();
  });

  it("should return the parent of the component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root", children: ["box-2"] }),
        "box-2": makeBoxComponent({ id: "box-2" }),
      },
    });

    expect(findParentWithChild(page, "box-2")).toBe("__root");
  });
});

describe("getRootComponent", () => {
  it("should return the root component", () => {
    const page = makePage({
      children: {
        __root: makeBoxComponent({ id: "__root" }),
      },
      childrenOrder: ["__root"],
    });

    expect(getRootComponent(page)).toEqual(page.children["__root"]);
  });
});
