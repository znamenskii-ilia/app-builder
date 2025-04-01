import { Input } from "@/common/ui/components/input";
import { Label } from "@/common/ui/components/label";
import { ToggleGroup, ToggleGroupItem } from "@/common/ui/components/toggle-group";
import type { ButtonComponent, ButtonComponentSize } from "@/modules/applicationEditing/domain";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type ButtonEditorProps = BaseEditorProps<ButtonComponent> & {
  onComponentChange: (component: ButtonComponent) => void;
};

export const ButtonEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: ButtonEditorProps) => {
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onComponentChange({
      ...component,
      props: { ...component.props, text: event.target.value },
    });
  };

  const handleSizeChange = (value: string) => {
    if (!value) return;

    onComponentChange({
      ...component,
      props: { ...component.props, size: value as ButtonComponentSize },
    });
  };

  return (
    <BaseEditor
      component={component}
      onComponentRename={onComponentRename}
      onComponentDelete={onComponentDelete}
    >
      <Section title="Styles">
        <PropertyGrid>
          <Label htmlFor="button-editor:text">Text</Label>
          <Input
            id="button-editor:text"
            name="text"
            type="text"
            value={component.props.text}
            onChange={handleLabelChange}
          />

          <Label htmlFor="button-editor:size">Size</Label>
          <ToggleGroup type="single" value={component.props.size} onValueChange={handleSizeChange}>
            <ToggleGroupItem value="small" aria-label="Small size">
              S
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" aria-label="Medium size">
              M
            </ToggleGroupItem>
            <ToggleGroupItem value="large" aria-label="Large size">
              L
            </ToggleGroupItem>
          </ToggleGroup>
        </PropertyGrid>
      </Section>
      <Section title="Events">TBD</Section>
    </BaseEditor>
  );
};
