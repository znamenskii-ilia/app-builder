import { ActorRefFromLogic, assign, fromPromise, setup } from "xstate";

import type { Page } from "@/modules/application/domain";
import {
  addComponent,
  deleteComponent,
  moveComponent,
  renameComponent,
  updateComponentProps,
} from "@/modules/application/domain";

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
    loadPage: fromPromise(async (_input: { input: string }): Promise<Page> => {
      throw new Error("Implementation is not provided");
    }),
    savePage: fromPromise(async (_input: { input: Page }): Promise<void> => {
      throw new Error("Implementation is not provided");
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
        input: ({ context }) => context.pageId,
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
        RENAME_COMPONENT: {
          actions: assign(({ context, event }) => {
            const { page } = context;
            const { componentId, name } = event;

            if (!page) return context;

            return {
              ...context,
              page: renameComponent(page, componentId, name),
            };
          }),
        },
        UPDATE_COMPONENT_PROPS: {
          actions: assign(({ context, event }) => {
            const { page } = context;
            const { componentId, component } = event;

            if (!page) return context;

            return {
              ...context,
              page: updateComponentProps(page, componentId, component),
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
