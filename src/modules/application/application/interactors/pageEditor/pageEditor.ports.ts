export type PageEditorEvents =
  | {
      type: "SELECT_COMPONENT";
      componentId: string | null;
    }
  | {
      type: "HIGHLIGHT_COMPONENT";
      componentId: string | null;
    };
