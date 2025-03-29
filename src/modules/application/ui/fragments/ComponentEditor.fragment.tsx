import { useSelector } from "@xstate/react";
import { selectComponentMaybe } from "../../application/interactors/page";
import { PageActor } from "../../application/interactors/page/page.logic";
import { PageEditorActor } from "../../application/interactors/pageEditor/pageEditor.logic";
import { ComponentEditor } from "../components/ComponentEditor";

type ComponentEditorFragmentProps = {
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
};

export const ComponentEditorFragment = ({
  pageActor,
  pageEditorActor,
}: ComponentEditorFragmentProps) => {
  const selectedComponentId = useSelector(
    pageEditorActor,
    (state) => state.context.selectedComponentId,
  );
  const selectedComponent = useSelector(pageActor, selectComponentMaybe(selectedComponentId));

  if (!selectedComponent) {
    return null;
  }

  return (
    <ComponentEditor
      component={selectedComponent}
      onComponentRename={(name) => {
        pageActor.send({
          type: "RENAME_COMPONENT",
          componentId: selectedComponent.id,
          name,
        });
      }}
      onChange={(component) => {
        pageActor.send({
          type: "UPDATE_COMPONENT_PROPS",
          componentId: selectedComponent.id,
          component,
        });
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
