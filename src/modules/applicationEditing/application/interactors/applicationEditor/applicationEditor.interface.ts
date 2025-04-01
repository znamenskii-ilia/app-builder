import type { Application } from "@/modules/applicationEditing/domain";

export type OpenEntityTuple = ["page" | "data-source" | "function", string];

export type ApplicationEditorInput = {
  applicationId: string;
  entity: OpenEntityTuple;
};

export type ApplicationEditorContext = {
  applicationId: string;
  application: Application | null;
  openEntities: OpenEntityTuple[];
};

export type ApplicationEditorEvents =
  | {
      type: "SELECT_ENTITY";
      entity: OpenEntityTuple;
    }
  | {
      type: "OPEN_ENTITY";
      entityId: string;
    }
  | {
      type: "CLOSE_ENTITY";
      entityId: string;
    }
  | {
      type: "SAVE";
    };
