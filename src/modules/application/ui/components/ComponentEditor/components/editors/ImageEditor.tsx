import { Input } from "@/common/ui/components/input";
import { Label } from "@/common/ui/components/label";
import { ToggleGroup, ToggleGroupItem } from "@/common/ui/components/toggle-group";
import type { ImageComponent, ImageComponentWidth } from "@/modules/application/domain";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type ImageEditorProps = BaseEditorProps<ImageComponent> & {
  onComponentChange: (component: ImageComponent) => void;
};

export const ImageEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: ImageEditorProps) => {
  return (
    <BaseEditor
      component={component}
      onComponentRename={onComponentRename}
      onComponentDelete={onComponentDelete}
    >
      <Section title="Style">
        <PropertyGrid>
          <Label htmlFor="image-editor:src">Source</Label>
          <Input
            id="image-editor:src"
            type="text"
            value={component.props.src}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  src: e.target.value,
                },
              })
            }
          />

          <Label htmlFor="image-editor:alt">Alt</Label>
          <Input
            id="image-editor:alt"
            type="text"
            value={component.props.alt}
            onChange={(e) =>
              onComponentChange({
                ...component,
                props: { ...component.props, alt: e.target.value },
              })
            }
          />

          <Label htmlFor="image-editor:width">Width</Label>
          <ToggleGroup
            type="single"
            value={component.props.widthType}
            onValueChange={(event) => {
              onComponentChange({
                ...component,
                props: {
                  ...component.props,
                  widthType: event as ImageComponentWidth,
                },
              });
            }}
          >
            <ToggleGroupItem value="full" aria-label="Full width">
              Full
            </ToggleGroupItem>
            <ToggleGroupItem value="custom" aria-label="Custom width">
              Custom
            </ToggleGroupItem>
          </ToggleGroup>

          {component.props.widthType === "custom" && (
            <>
              <Label htmlFor="image-editor:width-custom">Custom width</Label>
              <Input
                id="image-editor:width-custom"
                type="number"
                min={0}
                max={100}
                value={component.props.customWidth}
                onChange={(e) => {
                  onComponentChange({
                    ...component,
                    props: {
                      ...component.props,
                      customWidth: Number(e.target.value),
                    },
                  });
                }}
              />
            </>
          )}
        </PropertyGrid>
      </Section>
    </BaseEditor>
  );
};
