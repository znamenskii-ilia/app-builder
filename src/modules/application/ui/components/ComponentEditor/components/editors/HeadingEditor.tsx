import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { Input } from "@/common/ui/components/input";
import { Label } from "@/common/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/components/select";
import { ToggleGroup, ToggleGroupItem } from "@/common/ui/components/toggle-group";
import type { HeadingComponent } from "@/modules/application/domain";
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
                props: {
                  ...component.props,
                  level: parseInt(value),
                },
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
          <ToggleGroup
            type="single"
            value={component.props.align}
            onValueChange={(value) => {
              if (!value) return;

              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  align: value as "left" | "center" | "right",
                },
              });
            }}
          >
            <ToggleGroupItem value="left" aria-label="Left align">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center align">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right align">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label htmlFor="column-editor:marginTop">Margin Top</Label>
          <Input
            id="column-editor:marginTop"
            type="number"
            min={0}
            max={6}
            value={component.props.marginTop}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  marginTop: parseInt(e.target.value),
                },
              })
            }
          />

          <Label htmlFor="column-editor:marginRight">Margin Right</Label>
          <Input
            id="column-editor:marginRight"
            type="number"
            min={0}
            max={6}
            value={component.props.marginRight}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  marginRight: parseInt(e.target.value),
                },
              })
            }
          />

          <Label htmlFor="column-editor:marginBottom">Margin Bottom</Label>
          <Input
            id="column-editor:marginBottom"
            type="number"
            min={0}
            max={6}
            value={component.props.marginBottom}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  marginBottom: parseInt(e.target.value),
                },
              })
            }
          />

          <Label htmlFor="column-editor:marginLeft">Margin Left</Label>
          <Input
            id="column-editor:marginLeft"
            type="number"
            min={0}
            max={6}
            value={component.props.marginLeft}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  marginLeft: parseInt(e.target.value),
                },
              })
            }
          />

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
