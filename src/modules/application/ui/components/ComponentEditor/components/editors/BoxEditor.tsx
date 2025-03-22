import { Input } from "../../../../../../../common/ui/components/input";
import { Label } from "../../../../../../../common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../common/ui/components/select";
import { BoxComponent } from "../../../../../domain/entities/Component/components";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type BoxEditorProps = BaseEditorProps<BoxComponent> & {
  onComponentChange: (component: BoxComponent) => void;
};

export const BoxEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: BoxEditorProps) => {
  const handleDirectionChange = (value: string) => {
    onComponentChange({
      ...component,
      props: {
        ...component.props,
        direction: value as "row" | "column",
      },
    });
  };

  const handleAlignChange = (value: string) => {
    onComponentChange({
      ...component,
      props: {
        ...component.props,
        align: value as "center" | "start" | "end" | "stretch",
      },
    });
  };

  const handleJustifyChange = (value: string) => {
    onComponentChange({
      ...component,
      props: {
        ...component.props,
        justify: value as "center" | "start" | "end" | "space-between" | "space-around",
      },
    });
  };

  return (
    <BaseEditor
      component={component}
      onComponentRename={onComponentRename}
      onComponentDelete={onComponentDelete}
    >
      <Section title="Style">
        <PropertyGrid>
          <Label htmlFor="column-editor:direction">Direction</Label>
          <Select value={component.props.direction} onValueChange={handleDirectionChange}>
            <SelectTrigger id="column-editor:direction">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="row">Row</SelectItem>
              <SelectItem value="column">Column</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="column-editor:align">Align</Label>
          <Select value={component.props.align} onValueChange={handleAlignChange}>
            <SelectTrigger id="column-editor:align">
              <SelectValue placeholder="Align" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="start">Start</SelectItem>
              <SelectItem value="end">End</SelectItem>
              <SelectItem value="stretch">Stretch</SelectItem>
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
              <SelectItem value="space-between">Space Between</SelectItem>
              <SelectItem value="space-around">Space Around</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="column-editor:padding">Padding</Label>
          <Input
            id="column-editor:padding"
            type="number"
            min={0}
            max={6}
            value={component.props.padding}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  padding: parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
                },
              })
            }
          />

          <Label htmlFor="column-editor:gap">Gap</Label>
          <Input
            id="column-editor:gap"
            type="number"
            min={0}
            max={6}
            value={component.props.gap}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  gap: parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
                },
              })
            }
          />

          <Label htmlFor="column-editor:background">BgColor</Label>
          <Input
            id="column-editor:background"
            type="color"
            value={component.props.background}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: { ...component.props, background: e.target.value },
              })
            }
          />

          <Label htmlFor="column-editor:border">Border</Label>
          <Input
            id="column-editor:border"
            type="number"
            value={component.props.border}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: { ...component.props, border: parseInt(e.target.value) as 0 | 1 | 2 | 3 },
              })
            }
          />
        </PropertyGrid>
      </Section>
    </BaseEditor>
  );
};
