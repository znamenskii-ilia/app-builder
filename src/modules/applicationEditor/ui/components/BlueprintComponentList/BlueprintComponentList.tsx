import { cn } from "../../../../../common/ui/utils";
import { BlueprintComponent } from "../../../domain/BlueprintComponent/BlueprintComponent";

type BlueprintComponentListProps = {
  components: BlueprintComponent[];
  onAddComponent: (blueprintComponentType: string) => void;
};

export const BlueprintComponentList = ({
  components,
  onAddComponent,
}: BlueprintComponentListProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {components.map((component) => (
        <div
          key={component.id}
          className={cn(
            "flex items-center justify-center p-2 border rounded-md cursor-pointer",
            "w-[calc(50%-0.5rem)] min-w-[100px]",
          )}
          onClick={() => onAddComponent(component.type)}
        >
          {component.type}
        </div>
      ))}
    </div>
  );
};
