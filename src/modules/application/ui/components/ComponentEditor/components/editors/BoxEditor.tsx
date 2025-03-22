import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignStartHorizontal,
  MoveDown,
  MoveRight,
  SeparatorHorizontal,
} from "lucide-react";
import { Input } from "../../../../../../../common/ui/components/input";
import { Label } from "../../../../../../../common/ui/components/label";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../../../../common/ui/components/toggle-group";
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
    if (!value) return;

    onComponentChange({
      ...component,
      props: {
        ...component.props,
        direction: value as "row" | "column",
      },
    });
  };

  const handleAlignChange = (value: string) => {
    if (!value) return;

    onComponentChange({
      ...component,
      props: {
        ...component.props,
        align: value as "center" | "start" | "end" | "stretch",
      },
    });
  };

  const handleJustifyChange = (value: string) => {
    if (!value) return;

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

          <ToggleGroup
            type="single"
            value={component.props.direction}
            onValueChange={handleDirectionChange}
          >
            <ToggleGroupItem value="row" aria-label="Row direction">
              <MoveRight className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="column" aria-label="Column direction">
              <MoveDown className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:align">Align</Label>
          <ToggleGroup
            type="single"
            value={component.props.align}
            onValueChange={handleAlignChange}
          >
            <ToggleGroupItem value="start" aria-label="Start align">
              <AlignStartHorizontal className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center align">
              <AlignCenterHorizontal className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="end" aria-label="End align">
              <AlignEndHorizontal className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="stretch" aria-label="Stretch align">
              <SeparatorHorizontal className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:justify">Justify</Label>
          <ToggleGroup
            type="single"
            value={component.props.justify}
            onValueChange={handleJustifyChange}
          >
            <ToggleGroupItem value="start" aria-label="Start justify">
              <AlignHorizontalJustifyStart className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center justify">
              <AlignCenterVertical className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="end" aria-label="End justify">
              <AlignHorizontalJustifyEnd className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="space-between" aria-label="Space between">
              <AlignHorizontalSpaceBetween className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="space-around" aria-label="Space around">
              <AlignHorizontalSpaceAround className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>

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
