import { Component } from "../../../domain/Component/Component";

export type ComponentEditorrrProps<TComponent extends Component> = {
  component: TComponent;
  onComponentChange: (component: TComponent) => void;
};
