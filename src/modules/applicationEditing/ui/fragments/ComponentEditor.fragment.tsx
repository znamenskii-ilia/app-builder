import { useSelector } from "@xstate/react";

import {
  PageActor,
  selectComponentMaybe,
} from "@/modules/applicationEditing/application/interactors/page";
import { PageEditorActor } from "@/modules/applicationEditing/application/interactors/pageEditor";
import { ComponentEditor } from "@/modules/applicationEditing/ui/components/ComponentEditor";

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
