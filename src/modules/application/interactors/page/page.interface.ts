import { Component, Page } from "../../domain/entities";
import { ComponentActor } from "../component/component.interface";

export type PageContext = {
  pageId: string;
  page: (Omit<Page, "children"> & { children: Record<string, ComponentActor> }) | null;
};

export type PageEvents =
  // COMMANDS
  | {
      type: "CHANGE_PAGE";
      pageId: string;
    }
  | {
      type: "SAVE";
    }
  | {
      type: "RESET_SELECTION";
    }
  | {
      type: "ADD_COMPONENT";
      componentType: Component["component"];
      targetComponentId: string;
    }
  | {
      type: "DELETE_COMPONENT";
      componentId: string;
    }
  // NOTIFICATIONS
  | {
      type: "CHILD_SELECTED";
      componentId: string;
    }
  | {
      type: "COMPONENT_DELETED";
      componentIds: string[];
    };
