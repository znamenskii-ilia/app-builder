import memoizeOne from "memoize-one";
import { SnapshotFrom } from "xstate";
import { ComponentActor } from "../component";
import { PageActor, pageLogic } from "./page.logic";

export const selectSelectedComponent = memoizeOne(
  (pageContext: SnapshotFrom<typeof pageLogic>): ComponentActor | undefined => {
    const { page } = pageContext.context;

    if (!page) {
      throw new Error("Page or selected component id not found");
    }

    return Object.values(page.children).find((actor) => actor.getSnapshot().matches("selected"));
  },
);

export const selectToJson = memoizeOne((pageContext: SnapshotFrom<typeof pageLogic>): string => {
  const { page } = pageContext.context;
  const json: any = {};

  if (!page) {
    return {} as any;
  }

  page.childrenOrder.forEach((id) => {
    json[id] = {
      id,
      component: page.children[id].getSnapshot().context.component,
    };
  });

  return JSON.stringify(json, null, 2);
});

export const iteratePage = <T>(pageActor: PageActor, fn: (actor: ComponentActor) => T): T[] => {
  const { context } = pageActor.getSnapshot();
  const { page } = context;

  if (!page) return [];

  return page.childrenOrder.map((childId) => page.children[childId]).map(fn);
};

export type PageExplorerAdapterProps = {
  pageActor: PageActor;
};
