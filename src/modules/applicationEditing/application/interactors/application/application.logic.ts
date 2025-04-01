import { ActorRefFromLogic, assign, setup } from "xstate";

import { deleteEntity, type Application } from "@/modules/applicationEditing/domain";

import type { ApplicationEvents } from "./application.ports";

export type ApplicationActor = ActorRefFromLogic<typeof applicationLogic>;

export const applicationLogic = setup({
  types: {
    input: {} as {
      applicationId: string;
    },
    context: {} as {
      applicationId: string;
      application: Application | null;
    },
    events: {} as ApplicationEvents,
  },
}).createMachine({
  id: "applicationActor",
  context: ({ input }) => {
    return {
      applicationId: input.applicationId,
      application: {
        id: input.applicationId,
        name: "Application 1",
        description: "Description 1",
        lastModified: 1717171717171,
        pages: [
          {
            id: "page-1",
            name: "Page 1",
            type: "page",
          },
          {
            id: "page-2",
            name: "Page 2",
            type: "page",
          },
        ],
        functions: [
          {
            id: "function-1",
            name: "Function 1",
            type: "function",
          },
        ],
        dataSources: [],
      },
    };
  },
  initial: "loaded",
  states: {
    loading: {},
    loaded: {
      on: {
        DELETE_ENTITY: {
          actions: assign(({ event, context }) => {
            if (!context.application) return context;

            const nextApplication = deleteEntity(
              context.application,
              event.entityId,
              event.entityType,
            );

            return {
              application: nextApplication,
            };
          }),
        },
      },
    },
  },
});
