import { assign, fromPromise, setup } from "xstate";
import { ApplicationContext, ApplicationEvents, ApplicationInput } from "./application.ports";
import { Application } from "../../domain";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const applicationLogic = setup({
  types: {
    input: {} as ApplicationInput,
    context: {} as ApplicationContext,
    events: {} as ApplicationEvents,
  },
  actors: {
    loadApplication: fromPromise(async ({ input }: { input: { applicationId: string } }) => {
      await sleep(100);

      const application: Application = {
        id: input.applicationId,
        name: "Nebula Dashboard",
        description: "Nebula Dashboard",
        lastModified: 1715731200,
        pages: [
          {
            id: "1",
            name: "Home",
          },
          {
            id: "2",
            name: "About",
          },
        ],
        functions: [],
        dataSources: [],
      };

      return application;
    }),
    deleteApplication: fromPromise(async ({ input }: { input: { applicationId: string } }) => {
      await sleep(3000);
      return {
        id: input.applicationId,
      };
    }),
  },
}).createMachine({
  context: {
    applicationId: "",
    application: null,
    error: null,
  },
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "loadApplication",
        input: ({ context }) => ({
          applicationId: context.applicationId,
        }),
        onDone: {
          target: "loadingSuccess",
          actions: assign(({ event }) => ({
            application: event.output,
          })),
        },
        onError: {
          target: "loadingError",
        },
      },
    },
    loadingSuccess: {
      initial: "idle",
      states: {
        idle: {
          on: {
            RENAME_APPLICATION: {
              actions: assign(({ event, context }) => ({
                application: {
                  ...context.application!,
                  name: event.name,
                },
              })),
            },
            DELETE_APPLICATION: {
              target: "deleting",
            },
          },
        },
        deleting: {
          invoke: {
            src: "deleteApplication",
            input: ({ context }) => ({
              applicationId: context.application!.id,
            }),
            onDone: {
              target: "idle",
            },
          },
        },
      },
    },
    loadingError: {},
  },
});
