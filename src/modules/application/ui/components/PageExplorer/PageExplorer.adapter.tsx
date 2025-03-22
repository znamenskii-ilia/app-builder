import { useSelector } from "@xstate/react";
import { memo } from "react";
import { ComponentActor } from "../../../interactors/component";
import { iteratePage, PageActor, PageExplorerAdapterProps } from "../../../interactors/page";
import { PageExplorer } from "./PageExplorer.component";
import { PageExplorerItem } from "./PageExplorerItem.component";

const PageExplorerItemAdapter = memo(
  ({
    pageActor,
    actor,
    level,
  }: {
    pageActor: PageActor;
    actor: ComponentActor;
    level: 0 | 1 | 2 | 3 | 4;
  }) => {
    const isSelected = useSelector(actor, (state) => state.matches("selected"));
    const pageChildren = useSelector(pageActor, (state) => state.context.page?.children || {});
    const componentChildrenIds = useSelector(actor, (state) => state.context.children);
    const componentName = useSelector(actor, (state) => state.context.name);

    return (
      <PageExplorerItem
        componentName={componentName}
        level={level}
        isSelected={isSelected}
        onHoverEnter={() => actor.send({ type: "HOVER_ENTER" })}
        onHoverLeave={() => actor.send({ type: "HOVER_LEAVE" })}
        onSelect={() => actor.send({ type: "SELECT" })}
      >
        {componentChildrenIds.map((childId) => (
          <PageExplorerItemAdapter
            pageActor={pageActor}
            actor={pageChildren[childId]}
            level={(level + 1) as 0 | 1 | 2 | 3 | 4}
            key={childId}
          />
        ))}
      </PageExplorerItem>
    );
  },
);

export const PageExplorerAdapter = memo(({ pageActor }: PageExplorerAdapterProps) => {
  return (
    <PageExplorer>
      {iteratePage(pageActor, (actor) => (
        <PageExplorerItemAdapter
          pageActor={pageActor}
          actor={actor}
          level={0}
          key={actor.getSnapshot().context.id}
        />
      ))}
    </PageExplorer>
  );
});
