export type ApplicationEntityType = "page" | "data-source" | "function";

export type ApplicationEntity = {
  id: string;
  name: string;
  type: ApplicationEntityType;
};
