import type { Application } from "../../domain";

export type ApplicationInput = {
  applicationId: string;
};

export type ApplicationEvents =
  | {
      type: "LOAD_APPLICATION";
    }
  | {
      type: "DELETE_APPLICATION";
    }
  | {
      type: "RENAME_APPLICATION";
      name: string;
    }
  | {
      type: "CREATE_PAGE";
      name: string;
    }
  | {
      type: "DELETE_PAGE";
      pageId: string;
    }
  | {
      type: "RENAME_PAGE";
      pageId: string;
      name: string;
    };

export type ApplicationContext = {
  applicationId: string;
  application: Application | null;
  error: Error | null;
};
