import { ComponentActor } from "../../../interactors/component";
import { ButtonComponent } from "./components/ButtonComponent";
import { ColumnComponent } from "./components/ColumnComponent";
import { RowComponent } from "./components/RowComponent";

export const resolveComponent = (pageChildren: Record<string, ComponentActor>, childId: string) => {
  const actor = pageChildren[childId];
  const context = actor.getSnapshot().context;

  switch (context.component) {
    case "Row":
      return <RowComponent pageChildren={pageChildren} actor={actor} key={context.id} />;
    case "Column":
      return <ColumnComponent pageChildren={pageChildren} actor={actor} key={context.id} />;
    case "Button":
      return <ButtonComponent actor={actor} key={context.id} />;
    default:
      return null;
  }
};
