import { ActorRefFromLogic, assign, enqueueActions, fromPromise, setup } from "xstate";
import { Component, Page } from "../../domain";
import {
  newButtonComponent,
  newColumnComponent,
  newHeadingComponent,
  newRowComponent,
} from "../../domain/Component/components";
import { ComponentActor, componentLogic } from "../component";
import type { PageContext, PageEvents } from "./page.interface";

export type PageActor = ActorRefFromLogic<typeof pageLogic>;

export const pageLogic = setup({
  types: {
    input: {} as {
      pageId: string;
    },
    context: {} as PageContext,
    events: {} as PageEvents,
  },
  actors: {
    loadPage: fromPromise(async ({ input }: { input: { pageId: string } }) => {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const components: Record<string, Component> = {
        "row-1": {
          id: "row-1",
          component: "Row",
          props: {
            flex: 1,
            direction: "row",
            align: "center",
            justify: "between",
            gap: "2",
            padding: 2,
            text: "Hello",
          },
          children: ["column-1"],
        },
        "column-1": {
          id: "column-1",
          component: "Column",
          props: {
            flex: 1,
            align: "center",
            justify: "between",
            padding: 2,
          },
          children: ["button-1", "button-2"],
        },
        "button-1": {
          id: "button-1",
          component: "Button",
          props: {
            text: "Login",
            size: "medium",
            variant: "contained",
            color: "primary",
            disabled: false,
            leftIcon: undefined,
            rightIcon: undefined,
          },
          events: {
            click: {
              preventDefault: false,
              stopPropagation: false,
              fn: "doSomething",
            },
          },
          children: [],
        },
        "button-2": {
          id: "button-2",
          component: "Button",
          props: {
            text: "Register",
            size: "medium",
            variant: "contained",
            color: "primary",
            disabled: false,
            leftIcon: undefined,
            rightIcon: undefined,
          },
          events: {
            click: {
              preventDefault: false,
              stopPropagation: false,
              fn: "doSomething",
            },
          },
          children: [],
        },
      };

      const page: Page = {
        id: input.pageId,
        applicationId: "1",
        name: "New Page",
        metadata: {
          title: "New Page",
        },
        children: components,
        childrenOrder: ["row-1"],
      };

      return page;
    }),
  },
}).createMachine({
  id: "pageSchema",
  context: ({ input }) => {
    return {
      pageId: input.pageId,
      page: null,
      children: [],
      selectedComponentId: null,
    };
  },
  initial: "loadingPage",
  on: {
    CHANGE_PAGE: {
      actions: [assign(({ event }) => ({ pageId: event.pageId }))],
      target: ".loadingPage",
    },
  },
  states: {
    loadingPage: {
      invoke: {
        src: "loadPage",
        input: ({ context }) => ({
          pageId: context.pageId,
        }),
        onDone: {
          target: "pageLoaded",
          actions: [
            assign(({ event, spawn }) => ({
              page: {
                ...event.output,
                children: Object.values(event.output.children).reduce(
                  (acc, component) => {
                    const actor = spawn(componentLogic, { input: component });

                    return {
                      ...acc,
                      [component.id]: actor,
                    };
                  },
                  {} as Record<string, ComponentActor>,
                ),
              },
            })),
          ],
        },
      },
    },
    pageLoaded: {
      on: {
        CHILD_SELECTED: {
          actions: [
            assign(({ event }) => ({
              selectedComponentId: event.componentId,
            })),
            enqueueActions(({ context, enqueue, event }) => {
              Object.values(context.page?.children ?? {}).forEach((actor) => {
                if (actor.getSnapshot().context.id !== event.componentId) {
                  enqueue.sendTo(actor, { type: "UNSELECT" });
                }
              });
            }),
          ],
        },
        ADD_COMPONENT: {
          actions: [
            assign(({ context, event, spawn }): PageContext => {
              if (!context.page) return context;

              const resolveComponent = (): Component => {
                const id = Math.random().toString(36).substring(2, 15);

                switch (event.componentType) {
                  case "Row":
                    return newRowComponent(id);
                  case "Column":
                    return newColumnComponent(id);
                  case "Button":
                    return newButtonComponent(id);
                  case "Heading":
                    return newHeadingComponent(id);
                  default: {
                    const exhaustiveCheck: never = event.componentType;

                    throw new Error(`Unknown component type: ${exhaustiveCheck}`);
                  }
                }
              };

              const newComponent = resolveComponent();

              context.page?.children[event.targetComponentId].send({
                type: "ADD_COMPONENT",
                componentId: newComponent.id,
              });

              return {
                ...context,
                page: {
                  ...context.page,
                  children: {
                    ...context.page?.children,
                    [newComponent.id]: spawn(componentLogic, { input: newComponent }),
                  },
                },
              };
            }),
          ],
        },
      },
    },
  },
});
