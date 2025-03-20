import { ComponentsLibrary, ComponentsLibraryItem } from ".";
import { ComponentType } from "../../../domain/entities/Component/valueObjects/ComponentType";
import { ComponentsLibrarySection } from "./ComponentsLibrarySection.component";

export const ComponentsLibraryAdapter = () => {
  const layoutBlueprintComponentTypes: ComponentType[] = ["Box"];
  const textBlueprintComponentTypes: ComponentType[] = ["Heading", "Text"];
  const formBlueprintComponentTypes: ComponentType[] = ["Button"];

  return (
    <ComponentsLibrary>
      <ComponentsLibrarySection title="Layout">
        {layoutBlueprintComponentTypes.map((type) => (
          <ComponentsLibraryItem type={type} title={type} key={type} />
        ))}
      </ComponentsLibrarySection>
      <ComponentsLibrarySection title="Text">
        {textBlueprintComponentTypes.map((type) => (
          <ComponentsLibraryItem type={type} title={type} key={type} />
        ))}
      </ComponentsLibrarySection>
      <ComponentsLibrarySection title="Form">
        {formBlueprintComponentTypes.map((type) => (
          <ComponentsLibraryItem type={type} title={type} key={type} />
        ))}
      </ComponentsLibrarySection>
    </ComponentsLibrary>
  );
};
