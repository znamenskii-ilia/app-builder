import { memo } from "react";
import { ComponentActor } from "../../interactors/actors/component/component.logic";
import { ComponentsTree } from "../components/ComponentsTree/ComponentsTree";
import { ComponentsTreeNode } from "../components/ComponentsTree/ComponentsTreeNode";
import { useSelector } from "@xstate/react";

export type ComponentsTreeFragmentProps = {
  actors: ComponentActor[];
};

const ComponentTreeNode_ = memo(
  ({ actor, level }: { actor: ComponentActor; level: 0 | 1 | 2 | 3 | 4 }) => {
    const isHovering = useSelector(actor, (state) => state.matches("hover"));
    const isSelected = useSelector(actor, (state) => state.matches("selected"));

    return (
      <ComponentsTreeNode
        componentName={actor.getSnapshot().context.component}
        level={level}
        isHovering={isHovering}
        isSelected={isSelected}
        onHoverEnter={() => actor.send({ type: "HOVER_ENTER" })}
        onHoverLeave={() => actor.send({ type: "HOVER_LEAVE" })}
        onSelect={() => actor.send({ type: "SELECT" })}
        key={actor.getSnapshot().context.id}
      >
        {actor.getSnapshot().context.children.map((childActor) => (
          <ComponentTreeNode_ actor={childActor} level={(level + 1) as 0 | 1 | 2 | 3 | 4} />
        ))}
      </ComponentsTreeNode>
    );
  },
);

export const ComponentsTreeFragment = memo(({ actors }: ComponentsTreeFragmentProps) => {
  return (
    <ComponentsTree>
      {actors.map((actor) => (
        <ComponentTreeNode_ actor={actor} level={0} />
      ))}
    </ComponentsTree>
  );
});
