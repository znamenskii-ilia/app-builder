import { Input } from "../../../../../../../common/ui/components/input";
import { Label } from "../../../../../../../common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../../../../../../common/ui/components/select";
import { HeadingComponent } from "../../../../../domain/entities/Component/components";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type HeadingEditorProps = BaseEditorProps<HeadingComponent> & {
  onComponentChange: (component: HeadingComponent) => void;
};

export const HeadingEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: HeadingEditorProps) => {
  return (
    <BaseEditor
      component={component}
      onComponentRename={onComponentRename}
      onComponentDelete={onComponentDelete}
    >
      <Section title="Style">
        <PropertyGrid>
          <Label htmlFor="column-editor:level">Level</Label>
          <Select
            value={`${component.props.level}`}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: { ...component.props, level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 },
              })
            }
          >
            <SelectTrigger id="button-editor:size">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="column-editor:text">Text</Label>
          <Input
            id="column-editor:text"
            type="text"
            value={component.props.text}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  text: e.target.value,
                },
              })
            }
          />

          <Label htmlFor="column-editor:align">Align</Label>
          <Select
            value={component.props.align}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: { ...component.props, align: value as "left" | "center" | "right" },
              })
            }
          >
            <SelectTrigger id="column-editor:align">
              <SelectValue placeholder="Align" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="column-editor:color">Color</Label>
          <Input
            id="column-editor:color"
            type="color"
            value={component.props.color}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: { ...component.props, color: e.target.value },
              })
            }
          />
        </PropertyGrid>
      </Section>
    </BaseEditor>
  );
};
