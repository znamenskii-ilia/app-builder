import { useMatch, useNavigate } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";

import { ApplicationActor } from "@/modules/applicationEditing/ui/stores/interactors/application/application.logic";
import { AppNav } from "../components/AppNav";

type AppNavFragmentProps = {
  applicationActor: ApplicationActor;
};

export const AppNavFragment = ({ applicationActor }: AppNavFragmentProps) => {
  const application = useSelector(applicationActor, (state) => state.context.application);
  const navigate = useNavigate();
  const params = useMatch({ from: "/applications/$applicationId" });

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

    // @ts-expect-error TODO: fix this
    if (params.params.entityId === entityId) {
      navigate({
        to: "/applications/$applicationId",
        params: {
          applicationId: application.id,
        },
      });
    }
  };

  return <AppNav application={application} onEntityDelete={handleEntityDelete} />;
};
