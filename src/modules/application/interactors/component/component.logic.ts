import { assign, sendParent, setup } from "xstate";
import { Component } from "../../domain/entities";
import { ComponentContext, ComponentEvents } from "./component.interface";

export const componentLogic = setup({
  types: {
    input: {} as Component,
    context: {} as ComponentContext,
    events: {} as ComponentEvents,
  },
}).createMachine({
  context: ({ input }): ComponentContext => input,
  initial: "idle",
  on: {
    SELECT: {
      target: ".selected",
      actions: [
        // Clear parent and siblings selections
        sendParent(({ context }) => ({
          type: "CHILD_SELECTED",
          componentId: context.id,
        })),
      ],
    },
    UNSELECT: {
      target: ".idle",
    },
    ADD_COMPONENT: {
      actions: assign(({ context, event }) => ({
        children: [...context.children, event.componentId],
      })),
    },
  },
  states: {
    idle: {
      on: {
        HOVER_ENTER: { target: "hover" },
        DELETE_COMPONENT: {
          actions: assign(({ context, event }) => ({
            children: context.children.filter((id) => id !== event.componentId),
          })),
        },
      },
    },
    hover: {
      on: {
        HOVER_LEAVE: { target: "idle" },
      },
    },
    selected: {
      on: {
        RENAME: {
          actions: assign(
            ({ event, context }): ComponentContext => ({
              ...context,
              name: event.name,
            }),
          ),
        },
        UPDATE: {
          actions: assign(
            ({ event, context }): ComponentContext => ({
              ...event.component,
              children: context.children,
            }),
          ),
        },
        DELETE: {
          target: "deleted",
          actions: sendParent(({ context }) => ({
            type: "COMPONENT_DELETED",
            componentIds: [context.id, ...context.children],
          })),
        },
      },
    },
    deleted: {
      type: "final",
    },
  },
});
