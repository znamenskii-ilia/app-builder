import { ActorRefFromLogic, assign, enqueueActions, fromPromise, setup } from "xstate";
import { Component, Page } from "../../domain/entities";
import {
  newBoxComponent,
  newButtonComponent,
  newHeadingComponent,
  newImageComponent,
  newTextComponent,
} from "../../domain/entities/Component/components";
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
      await new Promise((resolve) => setTimeout(resolve, 0));
      const components: Record<string, Component> = {
        "box-1": {
          id: "box-1",
          component: "Box",
          name: "Root",
          props: {
            height: "full",
            width: "full",
            direction: "column",
            align: "stretch",
            justify: "start",
            gap: 2,
            padding: 0,
            background: "white",
            border: 0,
          },
          children: ["box-2", "box-3"],
        },
        "box-2": {
          id: "box-2",
          component: "Box",
          name: "Header",
          props: {
            height: "full",
            width: "full",
            direction: "row",
            align: "stretch",
            justify: "space-between",
            gap: 2,
            padding: 2,
            background: "black",
            border: 0,
          },
          children: ["heading-1", "button-1"],
        },
        "heading-1": {
          id: "heading-1",
          component: "Heading",
          name: "SiteName",
          props: {
            text: "John Doe",
            level: 1,
            align: "left",
            color: "white",
          },
          children: [],
        },
        "button-1": {
          id: "button-1",
          component: "Button",
          name: "ContactMe",
          props: {
            text: "Contact me",
            size: "medium",
            variant: "contained",
            color: "primary",
            disabled: false,
            leftIcon: undefined,
            rightIcon: undefined,
          },
          children: [],
          events: {},
        },
        "box-3": {
          id: "box-3",
          component: "Box",
          name: "Main",
          props: {
            height: "full",
            width: "full",
            direction: "row",
            align: "stretch",
            justify: "start",
            gap: 2,
            padding: 2,
            background: "white",
            border: 0,
          },
          children: ["box-4", "box-5"],
        },
        "box-4": {
          id: "box-4",
          component: "Box",
          name: "Sidebar",
          props: {
            height: "full",
            width: "full",
            direction: "column",
            align: "stretch",
            justify: "start",
            gap: 2,
            padding: 0,
            background: "white",
            border: 0,
          },
          children: ["text-1"],
        },
        "text-1": {
          id: "text-1",
          component: "Text",
          name: "RoleDescription",
          props: {
            text: "Software engineer, Master of some Engineering sciences",
            align: "left",
            color: "black",
          },
          children: [],
        },
        "box-5": {
          id: "box-5",
          component: "Box",
          name: "Content",
          props: {
            height: "full",
            width: "full",
            direction: "column",
            align: "stretch",
            justify: "start",
            gap: 2,
            padding: 0,
            background: "white",
            border: 0,
          },
          children: ["heading-2", "text-2"],
        },
        "heading-2": {
          id: "heading-2",
          component: "Heading",
          name: "AboutMe",
          props: {
            text: "About me",
            level: 2,
            align: "left",
            color: "black",
          },
          children: [],
        },
        "text-2": {
          id: "text-2",
          component: "Text",
          name: "Bio",
          props: {
            text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
            align: "left",
            color: "black",
          },
          children: [],
        },
      };

      // const components: Record<string, Component> = {
      //   "box-1": {
      //     id: "box-1",
      //     component: "Box",
      //     name: "Root",
      //     props: {
      //       height: "full",
      //       width: "full",
      //       direction: "column",
      //       align: "stretch",
      //       justify: "start",
      //       gap: 2,
      //       padding: 0,
      //       background: "white",
      //       border: 0,
      //     },
      //     children: ["heading-2", "text-bio-1", "text-bio-2"],
      //   },
      //   "heading-2": {
      //     id: "heading-2",
      //     component: "Heading",
      //     name: "AboutMe",
      //     props: {
      //       text: "About me",
      //       level: 2,
      //       align: "left",
      //       color: "black",
      //     },
      //     children: [],
      //   },
      //   "text-bio-1": {
      //     id: "text-bio-1",
      //     component: "Text",
      //     name: "Bio",
      //     props: {
      //       text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
      //       align: "left",
      //       color: "black",
      //     },
      //     children: [],
      //   },
      //   "text-bio-2": {
      //     id: "text-bio-2",
      //     component: "Text",
      //     name: "Bio2",
      //     props: {
      //       text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
      //       align: "left",
      //       color: "black",
      //     },
      //     children: [],
      //   },
      // };
      const page: Page = {
        id: input.pageId,
        applicationId: "1",
        name: "New Page",
        metadata: {
          title: "New Page",
        },
        children: components,
        childrenOrder: ["box-1"],
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
      initial: "idle",
      states: {
        idle: {},
        componentSelected: {
          target: "componentSelected",
        },
      },
      on: {
        CHILD_SELECTED: {
          target: ".componentSelected",
          actions: [
            assign(({ context }) => ({
              page: { ...context.page! },
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
        RESET_SELECTION: {
          target: ".idle",
          actions: ({ context }) => {
            Object.values(context.page?.children ?? {}).forEach((actor) => {
              actor.send({ type: "UNSELECT" });
            });
          },
        },
        ADD_COMPONENT: {
          actions: [
            assign(({ context, event, spawn }): PageContext => {
              if (!context.page) return context;

              const resolveComponent = (): Component => {
                const id = Math.random().toString(36).substring(2, 15);

                switch (event.componentType) {
                  case "Box":
                    return newBoxComponent(id);
                  case "Text":
                    return newTextComponent(id);
                  case "Heading":
                    return newHeadingComponent(id);
                  case "Button":
                    return newButtonComponent(id);
                  case "Image":
                    return newImageComponent(id);
                  default: {
                    const exhaustiveCheck: never = event.componentType;

                    throw new Error(`Unknown component type: ${exhaustiveCheck}`);
                  }
                }
              };

              const newComponent = resolveComponent();

              context.page?.children[event.targetComponentId].send({
                type: "ADD_CHILD",
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

            // Component can't be moved to itself or next to itself
            if (componentId === targetComponentId) return context;

            const componentParentId = Object.values(context.page?.children ?? {})
              .find((actor) => actor.getSnapshot().context.children.includes(componentId))
              ?.getSnapshot().context.id;

            // Component have to be inside a parent
            // The only component without a parent is the root component
            // And it can't be moved
            if (!componentParentId) return context;

            if (position === "inside") {
              const componentType =
                page.children[targetComponentId].getSnapshot().context.component;

              // Component can only be moved only inside a box
              if (componentType !== "Box") return context;

              // TODO: Something this event is not being triggered. Figure out why.
              page.children[componentParentId].send({
                type: "DELETE_CHILD",
                componentId,
              });

              page.children[targetComponentId].send({
                type: "ADD_CHILD",
                componentId,
              });

              return context;
            }

            const targetComponentParentId = Object.values(context.page?.children ?? {})
              .find((actor) => actor.getSnapshot().context.children.includes(targetComponentId))
              ?.getSnapshot().context.id;

            if (!targetComponentParentId) return context;

            page.children[componentParentId].send({
              type: "DELETE_CHILD",
              componentId,
            });

            page.children[targetComponentParentId].send({
              type: "ADD_CHILD",
              componentId,
              targetComponentId,
              position,
            });

            return context;
          }),
        },
        COMPONENT_DELETED: {
          actions: assign(({ context, event }) => {
            const { page } = context;

            if (!page) return context;

            const newChildrenOrder = page.childrenOrder.filter(
              (id) => !event.componentIds.includes(id),
            );

            Object.values(page.children).forEach((actor) => {
              event.componentIds.forEach((id) => {
                if (actor.getSnapshot().context.id !== id) {
                  actor.send({
                    type: "DELETE_CHILD",
                    componentId: id,
                  });
                }
              });
            });

            // event.componentIds.forEach((id) => {
            //   if (page.children[id]) {
            //     delete page.children[id];
            //   }
            // });

            return {
              ...context,
              // selectedComponentId:
              //   context.selectedComponentId &&
              //   event.componentIds.includes(context.selectedComponentId)
              //     ? null
              //     : context.selectedComponentId,
              page: {
                ...page,
                childrenOrder: newChildrenOrder,
              },
            };
          }),
        },
      },
    },
  },
});
