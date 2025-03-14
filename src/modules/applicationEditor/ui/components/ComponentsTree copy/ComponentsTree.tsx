import { ComponentActor } from "../../../interactors/component";
import { ComponentsTreeNode } from "./ComponentsTreeNode";

export type ComponentsTreeProps = {
  actors: ComponentActor[];
};

export const ComponentsTree = ({ actors }: ComponentsTreeProps) => {
  return (
    <div className="flex flex-col" data-component="ComponentsTree">
      {actors.map((actor) => (
        <ComponentsTreeNode key={actor.getSnapshot().context.id} actor={actor} />
      ))}
    </div>
  );
};
