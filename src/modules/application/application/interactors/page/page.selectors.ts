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

  if (!page) {
    return {} as any;
  }

  const componentToJson = (component: ComponentActor): any => {
    return {
      id: component.getSnapshot().context.id,
      component: component.getSnapshot().context.component,
      children: component.getSnapshot().context.children,
    };
  };

  const json = Object.values(page.children).map(componentToJson);

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
