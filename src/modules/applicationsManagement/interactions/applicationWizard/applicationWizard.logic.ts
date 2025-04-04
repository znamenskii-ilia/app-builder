import { ActorRefFromLogic, assign, fromPromise, setup } from "xstate";

import { ApplicationWizardEvents } from "./applicationWizard.events";
import { createApplication } from "@/modules/applicationsManagement/api/api";

export type ApplicationWizardActor = ActorRefFromLogic<typeof ApplicationWizardLogic>;

export const ApplicationWizardLogic = setup({
  types: {
    context: {} as {
      id: string | undefined;
      type: string | undefined;
      template: string | undefined;
      name: string | undefined;
      description: string | undefined;
    },
    events: {} as ApplicationWizardEvents,
  },
  actors: {
    saveApplication: fromPromise(
      async ({
        input,
      }: {
        input: { type: string; template: string; name: string; description: string };
      }): Promise<string> => {
        const application = await createApplication({
          type: input.type,
          template: input.template,
          name: input.name,
          description: input.description,
        });

        return application.id;
      },
    ),
  },
}).createMachine({
  id: "applicationWizard",
  context: {
    id: undefined,
    type: undefined,
    template: undefined,
    name: undefined,
    description: undefined,
  },
  initial: "chooseApplicationType",
  states: {
    chooseApplicationType: {
      on: {
        SET_APPLICATION_TYPE: {
          guard: ({ event }) => ["web", "mobile", "email"].includes(event.value),
          target: "chooseTemplate",
          actions: assign(({ event }) => ({
            type: event.value,
          })),
        },
      },
    },
    chooseTemplate: {
      on: {
        SET_TEMPLATE_NAME: {
          guard: ({ event }) => ["blank", "blog"].includes(event.value),
          target: "setApplicationData",
          actions: assign(({ event }) => ({
            template: event.value,
          })),
        },
      },
    },
    setApplicationData: {
      on: {
        SET_APPLICATION_DATA: {
          guard: ({ event }) =>
            event.name.length > 5 &&
            event.name.length < 40 &&
            event.description.length > 5 &&
            event.description.length < 200,
          target: "saving",
          actions: assign(({ event }) => ({
            name: event.name,
            description: event.description,
          })),
        },
      },
    },
    saving: {
      invoke: {
        src: "saveApplication",
        input: ({ context }) => ({
          type: context.type!,
          template: context.template!,
          name: context.name!,
          description: context.description!,
        }),
        onDone: {
          target: "saved",
          actions: assign(({ event }) => ({
            id: event.output,
          })),
        },
        onError: {
          target: "error",
        },
      },
    },
    error: {},
    saved: {
      type: "final",
    },
  },
});
