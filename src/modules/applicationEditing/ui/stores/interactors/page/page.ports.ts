import type { Component } from "@/modules/applicationEditing/domain";

export type PageEvents =
  | {
      type: "CHANGE_PAGE";
      pageId: string;
    }
  | {
      type: "SAVE";
    }
  | {
      type: "ADD_COMPONENT";
      componentType: Component["component"];
      targetComponentId: string;
    }
  | {
      type: "MOVE_COMPONENT";
      componentId: string;
      targetComponentId: string;
      position: "before" | "after" | "inside";
    }
  | {
      type: "RENAME_COMPONENT";
      componentId: string;
      name: string;
    }
  | {
      type: "UPDATE_COMPONENT_PROPS";
      componentId: string;
      component: Component;
    }
  | {
      type: "DELETE_COMPONENT";
      componentId: string;
    };
