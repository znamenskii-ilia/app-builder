import type { Component } from "@/modules/application/domain";

import { BaseEditorProps } from "./components/editors/BaseEditor";
import { BoxEditor } from "./components/editors/BoxEditor";
import { ButtonEditor } from "./components/editors/ButtonEditor";
import { HeadingEditor } from "./components/editors/HeadingEditor";
import { ImageEditor } from "./components/editors/ImageEditor";
import { TextEditor } from "./components/editors/TextEditor";

type ComponentEditorProps = BaseEditorProps<Component> & {
  onChange: (component: Component) => void;
};

export const ComponentEditor = ({
  component,
  onComponentRename,
  onChange,
  onComponentDelete,
}: ComponentEditorProps) => {
  const renderEditor = () => {
    const { component: componentType } = component;

    switch (componentType) {
      case "Box":
        return (
          <BoxEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Button":
        return (
          <ButtonEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Text":
        return (
          <TextEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Heading":
        return (
          <HeadingEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onChange}
            onComponentDelete={onComponentDelete}
          />
        );
      case "Image":
        return (
          <ImageEditor
            component={component}
            onComponentRename={onComponentRename}
            onComponentChange={onChange}
            onComponentDelete={onComponentDelete}
          />
        );
      default: {
        const exhaustiveCheck: never = componentType;

        throw new Error(`Unknown component type: ${exhaustiveCheck}`);
      }
    }
  };

  return renderEditor();
};
