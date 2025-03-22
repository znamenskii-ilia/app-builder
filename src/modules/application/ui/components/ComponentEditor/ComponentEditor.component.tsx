import { Component } from "../../../domain/entities/Component/Component";
import { BaseEditorProps } from "./components/editors/BaseEditor";
import { BoxEditor } from "./components/editors/BoxEditor";
import { ButtonEditor } from "./components/editors/ButtonEditor";
import { HeadingEditor } from "./components/editors/HeadingEditor";
import { ImageEditor } from "./components/editors/ImageEditor";
import { TextEditor } from "./components/editors/TextEditor";

type ComponentEditorProps = BaseEditorProps<Component> & {
  onComponentChange: (component: Component) => void;
};

export const ComponentEditor = ({
  component,
  onComponentRename,
  onComponentChange,
  onComponentDelete,
}: ComponentEditorProps) => {
  const renderEditor = () => {
    switch (component.component) {
      case "Box":
        return (
          <BoxEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onComponentChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Button":
        return (
          <ButtonEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onComponentChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Text":
        return (
          <TextEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onComponentChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Heading":
        return (
          <HeadingEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onComponentChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Image":
        return (
          <ImageEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onComponentChange}
            onComponentDelete={onComponentDelete}
          />
        );
      default: {
        const exhaustiveCheck: never = component.component;

        throw new Error(`Unknown component type: ${exhaustiveCheck}`);
      }
    }
  };

  return renderEditor();
};
