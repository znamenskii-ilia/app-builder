import { Input } from "../../../../../../../common/ui/components/input";
import { Label } from "../../../../../../../common/ui/components/label";
import { TextComponent } from "../../../../../domain/entities/Component/components";
import { PropertyGrid } from "../PropertyGrid";
import { Section } from "../Section";
import { BaseEditor, BaseEditorProps } from "./BaseEditor";

type TextEditorProps = BaseEditorProps<TextComponent> & {
  onComponentChange: (component: TextComponent) => void;
};

export const TextEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: TextEditorProps) => {
  return (
    <BaseEditor
      component={component}
      onComponentRename={onComponentRename}
      onComponentDelete={onComponentDelete}
    >
      <Section title="Style">
        <PropertyGrid>
          <Label htmlFor="column-editor:gap">Text</Label>
          <Input
            id="column-editor:gap"
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
        </PropertyGrid>
      </Section>
    </BaseEditor>
  );
};
