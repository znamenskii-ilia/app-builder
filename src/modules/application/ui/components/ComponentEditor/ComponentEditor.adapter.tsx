import { useSelector } from "@xstate/react";
import { selectSelectedComponent, PageActor } from "../../../interactors/page";
import { ComponentEditor } from "./ComponentEditor.component";

type ComponentEditorAdapterProps = {
  pageActor: PageActor;
};

export const ComponentEditorAdapter = ({ pageActor }: ComponentEditorAdapterProps) => {
  const selectedComponent = useSelector(pageActor, selectSelectedComponent);
  const context = useSelector(selectedComponent, (state) => state?.context);

  if (!selectedComponent || !context) {
    return null;
  }

  return (
    <ComponentEditor
      component={context}
      onComponentRename={(name) => {
        selectedComponent.send({
          type: "RENAME",
          name,
        });
      }}
      onComponentChange={(newContext) => {
        selectedComponent.send({
          type: "UPDATE",
          component: newContext,
        });
      }}
      onComponentDelete={() => {
        selectedComponent.send({
          type: "DELETE",
        });
      }}
    />
  );
};
