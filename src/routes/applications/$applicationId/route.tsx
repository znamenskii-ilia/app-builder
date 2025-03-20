import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { ApplicationEntityType } from "../../../modules/application/domain/entities/Application/ApplicationEntity";
import { applicationEditorLogic } from "../../../modules/application/interactors/applicationEditor";
import { AppExplorerAdapter } from "../../../modules/application/ui/components/AppExplorer/AppExplorer.adapter";
import { Route as PageRoute } from "./$entityType.$entityId";

export const Route = createFileRoute("/applications/$applicationId")({
  component: ApplicationPage,
});

const routeEntityTypeToEntityType = (entityType: string): ApplicationEntityType => {
  switch (entityType) {
    case "pages":
      return "page";
    case "data-sources":
      return "data-source";
    case "functions":
      return "function";
    default: {
      throw new Error(`Unknown entity type: ${entityType}`);
    }
  }
};

function ApplicationPage() {
  const { applicationId } = Route.useParams();
  const { entityType, entityId } = PageRoute.useParams();
  const [applicationEditor, _, applicationEditorActor] = useMachine(applicationEditorLogic, {
    input: {
      applicationId,
      entity: [routeEntityTypeToEntityType(entityType), entityId],
    },
  });

  useEffect(() => {
    applicationEditorActor.send({
      type: "SELECT_ENTITY",
      entity: [routeEntityTypeToEntityType(entityType), entityId],
    });
  }, [applicationEditorActor, entityType, entityId]);

  if (!applicationEditor.matches("applicationLoaded")) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-1">
      <div className="border-r border-gray-200 overflow-auto w-[250px]">
        <div className="p-3">{applicationEditor.context.application?.name}</div>
        <AppExplorerAdapter
          selectedEntityId={entityId}
          applicationEditorActor={applicationEditorActor}
        />
      </div>
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* <WorkareaTabsList>
          {openEntities.map((entity) => (
            <WorkareaTabsTrigger
              entityType={entity.type}
              isSelected={entity.id === entityId}
              to={`/applications/${applicationEditorActor.getSnapshot().context.applicationId}/${entity.id}`}
              key={entity.id}
            >
              {entity.name}
            </WorkareaTabsTrigger>
          ))}
        </WorkareaTabsList> */}

        <Outlet />
      </div>
    </div>
  );
}
