export type ApplicationEntityType = "page" | "function" | "dataSource";

export type ApplicationEntity = {
  id: string;
  name: string;
  type: ApplicationEntityType;
};
