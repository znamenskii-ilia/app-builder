import { useSelector } from "@xstate/react";

import { Wizard } from "@/common/ui/components/Wizard";
import { ApplicationWizardActor } from "@/modules/applicationsManagement/interactions/applicationWizard/applicationWizard.logic";
import { useNavigate } from "@tanstack/react-router";
import {
  ApplicationData,
  ApplicationTemplate,
  ApplicationType,
} from "../components/ApplicationWizard";

type NewApplicationFragmentProps = {
  actor: ApplicationWizardActor;
};

export const NewApplicationFragment = ({ actor }: NewApplicationFragmentProps) => {
  const snapshot = useSelector(actor, (state) => state);
  const context = useSelector(actor, (state) => state.context);
  const navigate = useNavigate();

  if (snapshot.matches("saved")) {
    navigate({
      to: "/applications/$applicationId",
      params: { applicationId: context.id! },
    });

    return null;
  }

  return (
    <Wizard
      steps={[
        {
          label: "Type",
          isCurrent: snapshot.matches("chooseApplicationType"),
          isDone: Boolean(context.type),
          isFinal: false,
          render: () => (
            <ApplicationType
              value={context.type}
              onValueChange={(type) => {
                console.log("type", type);
                actor.send({ type: "SET_APPLICATION_TYPE", value: type });
              }}
            />
          ),
        },
        {
          label: "Template",
          isCurrent: snapshot.matches("chooseTemplate"),
          isDone: Boolean(context.template),
          isFinal: false,
          render: () => (
            <ApplicationTemplate
              value={context.template}
              onValueChange={(template) => {
                actor.send({ type: "SET_TEMPLATE_NAME", value: template });
              }}
            />
          ),
        },
        {
          label: "Name and Description",
          isCurrent: snapshot.matches("setApplicationData") || snapshot.matches("saving"),
          isDone: Boolean(context.name) && Boolean(context.description),
          isFinal: true,
          render: () => (
            <>
              {snapshot.matches("saving") ? (
                <div>Saving...</div>
              ) : (
                <ApplicationData
                  value={context.name}
                  onSave={(name, description) => {
                    actor.send({ type: "SET_APPLICATION_DATA", name, description });
                  }}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
};
