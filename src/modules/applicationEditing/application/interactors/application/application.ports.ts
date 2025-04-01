export type ApplicationEvents = {
  type: "DELETE_ENTITY";
  entityId: string;
  entityType: "page" | "function" | "dataSource";
};
