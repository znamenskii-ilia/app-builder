import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentActor } from "../../../interactors/actors/component/component.logic";

export type ComponentsTreeProps = {
  actor: ComponentActor;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const ComponentsTreeNode = ({ actor }: ComponentsTreeProps) => {
  const state = actor.getSnapshot();

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => actor.send({ type: "HOVER_ENTER" })}
      onMouseLeave={() => actor.send({ type: "HOVER_LEAVE" })}
    >
      <div
        tabIndex={0}
        onClick={() => actor.send({ type: "SELECT" })}
        className={cn("px-2", {
          "bg-green-100": state.matches("hover"),
          "bg-blue-100": state.matches("selected"),
        })}
      >
        {state.context.component}
      </div>

      <div className="pl-4">
        {state.context.children.map((childActor) => (
          <ComponentsTreeNode key={childActor.getSnapshot().context.id} actor={childActor} />
        ))}
      </div>
    </div>
  );
};
