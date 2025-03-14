import { Component, Page } from "../../domain";
import { ComponentActor } from "../component/component.interface";

export type PageContext = {
  pageId: string;
  page: (Omit<Page, "children"> & { children: Record<string, ComponentActor> }) | null;
  selectedComponentId: string | null;
};

export type PageEvents =
  | {
      type: "CHANGE_PAGE";
      pageId: string;
    }
  | {
      type: "CHILD_SELECTED";
      componentId: string;
    }
  | { type: "SAVE" }
  | { type: "RESET_SELECTION" }
  | { type: "ADD_COMPONENT"; componentType: Component["component"]; targetComponentId: string };
