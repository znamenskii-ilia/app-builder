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

import { Input } from "@/common/ui/components/input";
import { Label } from "@/common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/components/select";
import { Slider } from "@/common/ui/components/slider";
import { ToggleGroup, ToggleGroupItem } from "@/common/ui/components/toggle-group";
import type { BoxComponent } from "@/modules/application/domain";
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
          <Label htmlFor="column-editor:tag">Tag</Label>
          <Select
            value={component.props.tag}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  tag: value as
                    | "div"
                    | "section"
                    | "article"
                    | "header"
                    | "footer"
                    | "main"
                    | "aside",
                },
              })
            }
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="div">Div</SelectItem>
              <SelectItem value="section">Section</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="footer">Footer</SelectItem>
              <SelectItem value="main">Main</SelectItem>
              <SelectItem value="aside">Aside</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="column-editor:direction">Direction</Label>
          <ToggleGroup
            type="single"
            value={component.props.direction}
            onValueChange={handleDirectionChange}
          >
            <ToggleGroupItem value="row" aria-label="Row direction">
              <MoveRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="column" aria-label="Column direction">
              <MoveDown className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:align">Align</Label>
          <ToggleGroup
            type="single"
            value={component.props.align}
            onValueChange={handleAlignChange}
          >
            <ToggleGroupItem value="start" aria-label="Start align">
              <AlignStartHorizontal className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center align">
              <AlignCenterHorizontal className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="end" aria-label="End align">
              <AlignEndHorizontal className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="stretch" aria-label="Stretch align">
              <SeparatorHorizontal className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:justify">Justify</Label>
          <ToggleGroup
            type="single"
            value={component.props.justify}
            onValueChange={handleJustifyChange}
          >
            <ToggleGroupItem value="start" aria-label="Start justify">
              <AlignHorizontalJustifyStart className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center justify">
              <AlignCenterVertical className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="end" aria-label="End justify">
              <AlignHorizontalJustifyEnd className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="space-between" aria-label="Space between">
              <AlignHorizontalSpaceBetween className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="space-around" aria-label="Space around">
              <AlignHorizontalSpaceAround className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:padding">Padding</Label>
          <Slider
            id="column-editor:padding"
            value={[component.props.padding]}
            min={0}
            max={6}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  padding: value[0],
                },
              })
            }
          />

          <Label htmlFor="column-editor:gap">Gap</Label>
          <Slider
            id="column-editor:gap"
            value={[component.props.gap]}
            min={0}
            max={6}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  gap: value[0],
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
          <Slider
            id="column-editor:border"
            value={[component.props.border]}
            min={0}
            max={3}
            onValueChange={(value) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  border: value[0],
                },
              })
            }
          />
        </PropertyGrid>
      </Section>
    </BaseEditor>
  );
};
