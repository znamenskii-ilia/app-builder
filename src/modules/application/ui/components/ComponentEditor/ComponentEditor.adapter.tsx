import { useSelector } from "@xstate/react";
import { selectComponentMaybe } from "../../../application/interactors/page";
import { PageActor } from "../../../application/interactors/page/page.logic";
import { ComponentEditor } from "./ComponentEditor.component";

type ComponentEditorAdapterProps = {
  pageActor: PageActor;
};

export const ComponentEditorAdapter = ({ pageActor }: ComponentEditorAdapterProps) => {
  const selectedComponent = useSelector(pageActor, selectComponentMaybe("ywj0exx5dm"));

  if (!selectedComponent) {
    return null;
  }

  return (
    <ComponentEditor
      component={selectedComponent}
      onComponentRename={(name) => {
        // selectedComponent.send({
        //   type: "RENAME",
        //   name,
        // });
      }}
      onComponentChange={(newContext) => {
        // selectedComponent.send({
        //   type: "UPDATE",
        //   component: newContext,
        // });
      }}
      onComponentDelete={() => {
        pageActor.send({
          type: "DELETE_COMPONENT",
          componentId: selectedComponent.id,
        });
      }}
    />
  );
};
