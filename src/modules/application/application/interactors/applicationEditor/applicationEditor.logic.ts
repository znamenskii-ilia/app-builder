import { assign, fromPromise, setup } from "xstate";
import type { Application } from "../../../domain";
import {
  ApplicationEditorContext,
  ApplicationEditorEvents,
  ApplicationEditorInput,
} from "./applicationEditor.interface";

export const applicationEditorLogic = setup({
  types: {
    input: {} as ApplicationEditorInput,
    context: {} as ApplicationEditorContext,
    events: {} as ApplicationEditorEvents,
  },
  actors: {
    loadApplication: fromPromise(async ({ input }: { input: { applicationId: string } }) => {
      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(200);

      const application: Application = {
        id: input.applicationId,
        name: "Task manager",
        description: "App description",
        lastModified: new Date().getTime(),
        pages: [
          {
            id: "page-1",
            name: "Home",
            type: "page",
          },
          {
            id: "page-2",
            name: "Tasks",
            type: "page",
          },
        ],
        functions: [
          {
            id: "function-1",
            name: "Get user",
            type: "function",
          },
          {
            id: "function-2",
            name: "Get posts",
            type: "function",
          },
        ],
        dataSources: [
          {
            id: "data-source-1",
            name: "Postgres",
            type: "data-source",
          },
          {
            id: "data-source-2",
            name: "MongoDB",
            type: "data-source",
          },
        ],
      };

      return application;
    }),
  },
}).createMachine({
  context: ({ input }: { input: ApplicationEditorInput }) => ({
    applicationId: input.applicationId,
    application: null,
    openEntities: [input.entity],
  }),
  initial: "loadingApplication",
  states: {
    loadingApplication: {
      invoke: {
        src: "loadApplication",
        input: ({ context }) => ({
          applicationId: context.applicationId,
        }),
        onDone: {
          target: "applicationLoaded",
          actions: assign(({ event }) => ({
            application: event.output,
          })),
        },
      },
    },
    applicationLoaded: {
      on: {
        SELECT_ENTITY: {
          actions: assign(({ event, context }) => ({
            // Don't open the entity if it's already open
            openEntities: context.openEntities.find(([_, id]) => id === event.entity[1])
              ? context.openEntities
              : [...context.openEntities, event.entity],
          })),
        },
        CLOSE_ENTITY: {
          actions: assign(({ event, context }) => {
            const { openEntities } = context;
            const nextOpenEntities = openEntities.filter(([_, id]) => id !== event.entityId);

            return {
              openEntities: nextOpenEntities,
            };
          }),
        },
      },
    },
  },
});
