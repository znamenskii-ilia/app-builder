import { useNavigate, useParams } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";
import { useEffect } from "react";

import { ApplicationActor } from "@/modules/applicationEditing/ui/stores/interactors/application/application.logic";
import { AppNav } from "../components/AppNav";

type AppNavFragmentProps = {
  applicationActor: ApplicationActor;
};

export const AppNavFragment = ({ applicationActor }: AppNavFragmentProps) => {
  const application = useSelector(applicationActor, (state) => state.context.application);
  const navigate = useNavigate();
  const params = useParams({ from: "/applications/$applicationId" });

  useEffect(
    function redirectFromNotExistingEntity() {
      // @ts-expect-error TODO: fix this
      if (!application || !params.entityId || !params.entityType) return;

      if (
        // @ts-expect-error TODO: fix this
        !application[params.entityType].find(
          // @ts-expect-error TODO: fix this
          (entity) => entity.id === params.entityId,
        )
      ) {
        navigate({
          to: "/applications/$applicationId",
          params: {
            applicationId: application.id,
          },
        });
      }
    },
    // @ts-expect-error TODO: fix this
    [params.entityId, params.entityType, application, navigate],
  );

  if (!application) return null;

  const handleEntityDelete = (entityId: string, entityType: "page" | "function" | "dataSource") => {
    console.log("[DELETE ENTITY] Deleting entity", entityId, entityType);
    const confirm = window.confirm("Are you sure you want to delete this entity?");

    if (!confirm) return;

    applicationActor.send({
      type: "DELETE_ENTITY",
      entityId,
      entityType,
    });
  };

  return <AppNav application={application} onEntityDelete={handleEntityDelete} />;
};
