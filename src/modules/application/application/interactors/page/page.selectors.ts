import memoizeOne from "memoize-one";
import { SnapshotFrom } from "xstate";
import { type Component, getComponent, getRootComponent, type Page } from "../../../domain";
import { PageActor, pageLogic } from "./page.logic";

export const selectPageMaybe = (pageSnapshot: SnapshotFrom<typeof pageLogic>): Page | null => {
  const { page } = pageSnapshot.context;

  if (!page) return null;

  return page;
};

export const selectComponentMaybe =
  (componentId: string | null) =>
  (pageSnapshot: SnapshotFrom<typeof pageLogic>): Component | null => {
    if (!componentId) return null;

    const { page } = pageSnapshot.context;

    if (!page) return null;

    return getComponent(page, componentId);
  };

export const selectRootComponent = (pageSnapshot: SnapshotFrom<typeof pageLogic>): Component => {
  const { page } = pageSnapshot.context;

  if (!page) throw new Error("Page is not found");

  return getRootComponent(page);
};

export const selectToJson = memoizeOne((pageContext: SnapshotFrom<typeof pageLogic>): string => {
  const { page } = pageContext.context;

  if (!page) {
    throw new Error("Page is not found");
  }

  const componentToJson = (component: Component) => {
    return {
      id: component.id,
      component: component,
      children: component.children,
    };
  };

  const json = Object.values(page.children).map(componentToJson);

  return JSON.stringify(json, null, 2);
});

export type PageExplorerAdapterProps = {
  pageActor: PageActor;
};
