import { SnapshotFrom } from "xstate";

import {
  getComponent,
  getRootComponent,
  type Component,
  type Page,
} from "@/modules/application/domain";

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

export type PageExplorerAdapterProps = {
  pageActor: PageActor;
};
