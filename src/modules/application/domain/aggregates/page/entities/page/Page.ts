import { nanoid } from "nanoid";
import { ComponentType } from "../../valueObjects/ComponentType";
import { Component, createComponent } from "../component";

// Root entity
export type Page = {
  id: string;
  applicationId: string;
  name: string;
  metadata: {
    title: string;
  };
  children: Record<string, Component>;
  childrenOrder: string[];
};

export const renamePage = (page: Page, name: string): Page => {
  return { ...page, name };
};

export const updateComponentProps = (
  page: Page,
  componentId: string,
  component: Component,
): Page => {
  if (!page.children[componentId]) return page;

  return {
    ...page,
    children: { ...page.children, [componentId]: component },
  };
};

export const addComponent = (
  page: Page,
  componentType: ComponentType,
  targetComponentId: string,
): Page => {
  if (!page.children[targetComponentId]) return page;

  const nextPage = { ...page };
  const newComponent = createComponent(nanoid(), componentType);

  // New component should be the last child of the target component
  nextPage.children[targetComponentId].children.push(newComponent.id);
  nextPage.children[newComponent.id] = newComponent;

  return nextPage;
};

export const getComponent = (page: Page, componentId: string): Component | null => {
  return page.children[componentId] || null;
};

export const deleteComponent = (page: Page, componentId: string): Page => {
  if (!page.children[componentId]) {
    return page;
  }

  let nextPage = { ...page };

  const componentToDelete = nextPage.children[componentId];

  // Recursively delete all children in PostOrder manner
  // That is, delete the children first, then the component itself
  if (componentToDelete.children.length > 0) {
    componentToDelete.children.forEach((child) => {
      nextPage = deleteComponent(nextPage, child);
    });
  }

  // Delete the component from the parent
  const componentParentId = findParentWithChild(nextPage, componentId);

  if (!componentParentId) return page;

  nextPage = detachComponent(nextPage, componentId, componentParentId);

  const newChildren = { ...nextPage.children };

  delete newChildren[componentId];

  return { ...nextPage, children: newChildren };
};

export const moveComponent = (
  page: Page,
  componentId: string,
  targetComponentId: string,
  position: "inside" | "before" | "after",
): Page => {
  // Root component can't be moved
  if (componentId === "__root") return page;

  // Component can't be moved to itself or next to itself
  if (componentId === targetComponentId) return page;

  if (!page.children[componentId] || !page.children[targetComponentId]) return page;

  const componentParentId = findParentWithChild(page, componentId);

  if (!componentParentId) return page;

  if (position === "inside") {
    const componentType = page.children[targetComponentId].component;

    // Component can only be moved inside a box
    if (componentType !== "Box") return page;

    return attachComponent(
      detachComponent(page, componentId, componentParentId),
      componentId,
      targetComponentId,
    );
  }

  const targetParentBoxComponent = Object.values(page.children).find((child) =>
    child.children.includes(targetComponentId),
  );

  if (!targetParentBoxComponent) return page;

  const targetComponentIndex = targetParentBoxComponent.children.indexOf(targetComponentId);

  if (targetComponentIndex === -1) return page;

  return attachComponent(
    detachComponent(page, componentId, componentParentId),
    componentId,
    targetParentBoxComponent.id,
    position === "before" ? targetComponentIndex : targetComponentIndex + 1,
  );
};

export const renameComponent = (page: Page, componentId: string, name: string): Page => {
  if (!page.children[componentId]) return page;

  return {
    ...page,
    children: {
      ...page.children,
      [componentId]: { ...page.children[componentId], name },
    },
  };
};

/**
 * Detaches a component from its parent
 *
 * @example
 * ```ts
 * const page = {
 *   // ...
 *   children: {
 *     "box-1": { id: "box-1", children: ["box-2"] },
 *     "box-2": { id: "box-2", children: ["button-1"] },
 *     "button-1": { id: "button-1" },
 *   },
 * };
 *
 * const newPage = detachComponent(page, "button-1", "box-2");
 *
 * console.log(newPage);
 * // {
 * //   children: {
 * //     "box-1": { id: "box-1", children: ["box-2"] },
 * //     "box-2": { id: "box-2" },
 * //     "button-1": { id: "button-1" },
 * //   },
 * // };
 * ```
 * @param page - The page to detach the component from
 * @param componentId - The id of the component to detach
 * @param targetComponentId - The id of the component to detach the component from
 * @returns The new page with the detached component
 */
const detachComponent = (page: Page, componentId: string, targetComponentId: string): Page => {
  const component = page.children[componentId];
  const targetComponent = page.children[targetComponentId];

  if (!component || !targetComponent) return page;

  const newPage = { ...page };

  newPage.children = {
    ...newPage.children,
    [targetComponentId]: {
      ...newPage.children[targetComponentId],
      children: newPage.children[targetComponentId].children.filter(
        (child) => child !== componentId,
      ),
    },
  };

  return newPage;
};

/**
 * Attaches a component to a target component
 *
 * @example
 * ```ts
 * const page = {
 *   // ...
 *   children: {
 *     "box-1": { id: "box-1", children: ["box-2"] },
 *     "box-2": { id: "box-2", children: [] },
 *     "button-1": { id: "button-1" },
 *   },
 * };
 *
 * const newPage = attachComponent(page, "button-1", "box-2");
 *
 * console.log(newPage);
 * // {
 * //   children: {
 * //     "box-1": { id: "box-1", children: ["box-2"] },
 * //     "box-2": { id: "box-2", children: ["button-1"] },
 * //     "button-1": { id: "button-1" },
 * //   },
 * // };
 **/
const attachComponent = (
  page: Page,
  componentId: string,
  targetComponentId: string,
  index?: number,
): Page => {
  const component = page.children[componentId];
  const targetComponent = page.children[targetComponentId];

  if (!component || !targetComponent) return page;

  const newPage = { ...page };

  if (typeof index === "undefined" || index < 0) {
    newPage.children = {
      ...newPage.children,
      [targetComponentId]: {
        ...newPage.children[targetComponentId],
        children: [...newPage.children[targetComponentId].children, componentId],
      },
    };
  } else {
    newPage.children = {
      ...newPage.children,
      [targetComponentId]: {
        ...newPage.children[targetComponentId],
        children: [
          ...newPage.children[targetComponentId].children.slice(0, index),
          componentId,
          ...newPage.children[targetComponentId].children.slice(index),
        ],
      },
    };
  }

  return newPage;
};

export const findParentWithChild = (page: Page, componentId: string): string | undefined => {
  return Object.values(page.children).find((child) => child.children.includes(componentId))?.id;
};

export const getRootComponent = (page: Page): Component => {
  const rootComponentId = page.childrenOrder[0];

  if (!rootComponentId) {
    throw new Error("Root component not found");
  }

  return page.children[rootComponentId];
};
