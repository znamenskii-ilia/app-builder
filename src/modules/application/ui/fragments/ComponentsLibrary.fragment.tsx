import type { ComponentType } from "@/modules/application/domain";
import {
  ComponentsLibrary,
  ComponentsLibraryItem,
  ComponentsLibrarySection,
} from "@/modules/application/ui/components/ComponentsLibrary";

export const ComponentsLibraryFragment = () => {
  const layoutBlueprintComponentTypes: ComponentType[] = ["Box"];
  const textBlueprintComponentTypes: ComponentType[] = ["Heading", "Text", "Image"];
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
