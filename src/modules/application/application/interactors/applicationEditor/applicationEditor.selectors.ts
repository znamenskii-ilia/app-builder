import { SnapshotFrom } from "xstate";
import type { Application, ApplicationEntity, ApplicationEntityType } from "../../../domain";
import { applicationEditorLogic } from "./applicationEditor.logic";

export const selectOpenEntityIds = ({ context }: SnapshotFrom<typeof applicationEditorLogic>) =>
  context.openEntities;

export const selectOpenEntities = ({
  context,
}: SnapshotFrom<typeof applicationEditorLogic>): ApplicationEntity[] => {
  const { application, openEntities } = context;

  if (!application) return [];

  return openEntities
    .map(([entityType, entityId]) => findEntity(application, entityType, entityId))
    .filter((x) => x !== undefined);
};

const findEntity = (
  application: Application,
  entityType: ApplicationEntityType,
  entityId: string,
) => {
  let entity: ApplicationEntity[] | undefined;

  switch (entityType) {
    case "page":
      entity = application.pages;
      break;
    case "function":
      entity = application.functions;
      break;
    case "data-source":
      entity = application.dataSources;
      break;
    default: {
      const _exhaustiveCheck: never = entityType;
      throw new Error(`Unknown entity type: ${_exhaustiveCheck}`);
    }
  }

  return entity?.find((entity) => entity.id === entityId);
};
