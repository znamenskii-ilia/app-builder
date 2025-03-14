import { Component } from "../../../domain/Component/Component";
import { ButtonEditor } from "./components/componentEditors/ButtonEditor";
import { ColumnEditor } from "./components/componentEditors/ColumnEditor";
import { ComponentEditorrrProps } from "./type";

type ComponentEditorProps = ComponentEditorrrProps<Component>;

export const ComponentEditor = ({ component, onComponentChange }: ComponentEditorProps) => {
  const renderEditor = () => {
    switch (component.component) {
      // case "Row":
      //   return <RowEditor component={component} onComponentChange={onComponentChange} />;
      case "Column":
        return (
          <ColumnEditor
            component={component}
            onComponentChange={onComponentChange}
            key={component.id}
          />
        );
      case "Button":
        return (
          <ButtonEditor
            component={component}
            onComponentChange={onComponentChange}
            key={component.id}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="p-3">{component.id}</h1>
      {renderEditor()}
    </>
  );
};
