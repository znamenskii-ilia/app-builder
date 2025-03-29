import { ActorRefFromLogic, assign, fromPromise, setup } from "xstate";
import { addComponent, deleteComponent, moveComponent, Page } from "../../../domain/entities";
import type { PageEvents } from "./page.ports";

export type PageActor = ActorRefFromLogic<typeof pageLogic>;

export const pageLogic = setup({
  types: {
    input: {} as {
      pageId: string;
    },
    context: {} as {
      pageId: string;
      page: Page | null;
    },
    events: {} as PageEvents,
  },
  actors: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadPage: fromPromise(async (_input: { input: { pageId: string } }) => {
      const page: Page = {
        id: "1",
        applicationId: "1",
        name: "New Page",
        metadata: {
          title: "New Page",
        },
        children: {},
        childrenOrder: [],
      };

      return page;
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    savePage: fromPromise(async (_input: { input: Page }) => {
      return;
    }),
  },
}).createMachine({
  id: "pageSchema",
  context: ({ input }) => {
    return {
      pageId: input.pageId,
      page: null,
    };
  },
  initial: "loading",
  on: {
    CHANGE_PAGE: {
      actions: [assign(({ event }) => ({ pageId: event.pageId }))],
      target: ".loading",
    },
  },
  states: {
    loading: {
      invoke: {
        src: "loadPage",
        input: ({ context }) => ({
          pageId: context.pageId,
        }),
        onDone: {
          target: "loaded",
          actions: assign(({ event }) => ({
            page: event.output,
          })),
        },
      },
    },
    loaded: {
      initial: "idle",
      states: {
        idle: {},
        saving: {
          invoke: {
            src: "savePage",
            input: ({ context }) => {
              const { page } = context;

              if (!page) throw new Error("Page is not loaded");

              return page;
            },
            onDone: {
              target: "idle",
            },
          },
        },
      },
      on: {
        SAVE: {
          target: ".saving",
        },
        ADD_COMPONENT: {
          actions: [
            assign(({ context, event }) => {
              if (!context.page) return context;

              return {
                ...context,
                page: addComponent(context.page, event.componentType, event.targetComponentId),
              };
            }),
          ],
        },
        MOVE_COMPONENT: {
          actions: assign(({ context, event }) => {
            const { page } = context;
            const { componentId, targetComponentId, position } = event;

            if (!page) return context;

            console.log("Page [MOVE_COMPONENT]", {
              componentId: componentId,
              targetComponentId: targetComponentId,
              position: position,
            });

            return {
              ...context,
              page: moveComponent(page, componentId, targetComponentId, position),
            };
          }),
        },
        DELETE_COMPONENT: {
          actions: assign(({ context, event }) => {
            const { page } = context;
            const { componentId } = event;

            if (!page) return context;

            return {
              ...context,
              page: deleteComponent(page, componentId),
            };
          }),
        },
      },
    },
  },
});
