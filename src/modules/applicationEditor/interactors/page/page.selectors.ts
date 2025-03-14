import memoizeOne from "memoize-one";
import { SnapshotFrom } from "xstate";
import { pageLogic } from "./page.logic";
import { ComponentActor } from "../component";

export const selectSelectedComponent = memoizeOne(
  (pageContext: SnapshotFrom<typeof pageLogic>): ComponentActor => {
    const { page, selectedComponentId } = pageContext.context;

    if (!page || !selectedComponentId) {
      throw new Error("Page or selected component id not found");
    }

    return page.children[selectedComponentId];
  },
);
