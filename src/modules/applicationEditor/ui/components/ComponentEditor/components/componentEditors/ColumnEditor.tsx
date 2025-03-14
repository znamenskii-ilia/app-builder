import { Label } from "../../../../../../../common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../common/ui/components/select";
import { ColumnComponent } from "../../../../../domain/Component/components";
import { ComponentEditorrrProps } from "../../type";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";

type ColumnEditorProps = ComponentEditorrrProps<ColumnComponent>;

export const ColumnEditor = ({ component, onComponentChange }: ColumnEditorProps) => {
  const handleAlignChange = (value: string) => {
    onComponentChange({
      ...component,
      props: {
        ...component.props,
        align: value as "center" | "start" | "end" | "between" | "around",
      },
    });
  };

  const handleJustifyChange = (value: string) => {
    onComponentChange({
      ...component,
      props: {
        ...component.props,
        justify: value as "center" | "start" | "end" | "between" | "around",
      },
    });
  };

  return (
    <Section title="Style">
      <PropertyGrid>
        <Label htmlFor="column-editor:align">Align</Label>
        <Select value={component.props.align} onValueChange={handleAlignChange}>
          <SelectTrigger id="column-editor:align">
            <SelectValue placeholder="Align" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="start">Start</SelectItem>
            <SelectItem value="end">End</SelectItem>
            <SelectItem value="between">Between</SelectItem>
            <SelectItem value="around">Around</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="column-editor:justify">Justify</Label>
        <Select value={component.props.justify} onValueChange={handleJustifyChange}>
          <SelectTrigger id="column-editor:justify">
            <SelectValue placeholder="Justify" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="start">Start</SelectItem>
            <SelectItem value="end">End</SelectItem>
            <SelectItem value="between">Between</SelectItem>
            <SelectItem value="around">Around</SelectItem>
          </SelectContent>
        </Select>
      </PropertyGrid>
    </Section>
  );
};
