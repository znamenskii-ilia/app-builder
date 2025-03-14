import { useSelector } from "@xstate/react";
import { selectSelectedComponent, PageActor } from "../../interactors/page";
import { ComponentEditor } from "../components/ComponentEditor/ComponentEditor";

type ComponentEditorFragmentProps = {
  pageActor: PageActor;
};

export const ComponentEditorFragment = ({ pageActor }: ComponentEditorFragmentProps) => {
  const selectedComponent = useSelector(pageActor, selectSelectedComponent);
  const context = useSelector(selectedComponent, (state) => state?.context);

  if (!selectedComponent || !context) {
    return null;
  }

  return (
    <ComponentEditor
      component={context}
      onComponentChange={(newContext) => {
        selectedComponent.send({
          type: "UPDATE",
          component: newContext,
        });
      }}
    />
  );
};
