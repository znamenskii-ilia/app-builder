import { PageActor } from "../../interactors/page";
import { BlueprintComponentList } from "../components/BlueprintComponentList";

type BlueprintComponentLibraryFragmentProps = {
  pageActor: PageActor;
};

export const BlueprintComponentLibraryFragment = ({
  pageActor,
}: BlueprintComponentLibraryFragmentProps) => {
  return (
    <BlueprintComponentList
      components={[
        { id: "button", type: "Button" },
        { id: "row", type: "Row" },
        { id: "column", type: "Column" },
      ]}
      onAddComponent={(blueprintComponentType) => {}}
    />
  );
};
