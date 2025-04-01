import { ApplicationEntity } from "./ApplicationEntity";

export type Application = {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  pages: ApplicationEntity[];
  functions: ApplicationEntity[];
  dataSources: ApplicationEntity[];
};

export const deleteEntity = (
  application: Application,
  entityId: string,
  entityType: "page" | "function" | "dataSource",
) => {
  const entityTypeToKey = {
    page: "pages",
    function: "functions",
    dataSource: "dataSources",
  } as const;

  const key = entityTypeToKey[entityType];

  if (!key) {
    throw new Error("Invalid entity type");
  }

  return {
    ...application,
    [key]: application[key].filter((entity) => entity.id !== entityId),
  };
};
