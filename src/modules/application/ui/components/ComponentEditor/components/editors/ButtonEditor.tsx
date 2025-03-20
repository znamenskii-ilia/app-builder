import { Input } from "../../../../../../../common/ui/components/input";
import { Label } from "../../../../../../../common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../common/ui/components/select";
import {
  ButtonComponent,
  ButtonComponentSize,
} from "../../../../../domain/entities/Component/components";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type ButtonEditorProps = BaseEditorProps<ButtonComponent> & {
  onComponentChange: (component: ButtonComponent) => void;
};

export const ButtonEditor = ({
  component,
  onComponentChange,
  onComponentDelete,
}: ButtonEditorProps) => {
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onComponentChange({ ...component, props: { ...component.props, text: event.target.value } });
  };

  const handleSizeChange = (value: string) => {
    onComponentChange({
      ...component,
      props: { ...component.props, size: value as ButtonComponentSize },
    });
  };

  return (
    <BaseEditor component={component} onComponentDelete={onComponentDelete}>
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
          <Select value={component.props.size} onValueChange={handleSizeChange}>
            <SelectTrigger id="button-editor:size">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </PropertyGrid>
      </Section>
      <Section title="Events">TBD</Section>
    </BaseEditor>
  );
};
