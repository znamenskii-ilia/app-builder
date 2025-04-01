import { ComponentType } from "react";

export type CreatePage = {
  pageName: string;
  applicationId: string;
};

// export type SavePage = {};

export type ChangePage = {
  pageId: string;
};

export type DeletePage = {
  pageId: string;
};

// export type ResetSelection = {};

export type AddComponent = {
  componentType: ComponentType;
  targetComponentId: string;
};

export type DeleteComponent = {
  componentId: string;
};

export type MoveComponent = {
  componentId: string;
  targetComponentId: string;
  position: "before" | "after" | "inside";
};
