import { assign, sendParent, setup } from "xstate";
import { Component } from "../../../domain/entities";
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
    ADD_CHILD: {
      actions: assign(({ context, event }) => {
        const { componentId, targetComponentId, position = "after" } = event;

        if (targetComponentId) {
          const targetComponentIndex = context.children.indexOf(targetComponentId);

          if (targetComponentIndex === -1) {
            if (position === "before") {
              return {
                children: [...context.children, componentId],
              };
            }

            return {
              children: [...context.children, componentId],
            };
          }

          if (position === "before") {
            return {
              children: [
                ...context.children.slice(0, targetComponentIndex),
                componentId,
                ...context.children.slice(targetComponentIndex),
              ],
            };
          }

          return {
            children: [
              ...context.children.slice(0, targetComponentIndex + 1),
              componentId,
              ...context.children.slice(targetComponentIndex + 1),
            ],
          };
        }

        if (position === "before") {
          return {
            children: [componentId, ...context.children],
          };
        }

        return {
          children: [...context.children, componentId],
        };
      }),
    },
  },
  states: {
    idle: {
      on: {
        HOVER_ENTER: { target: "hover" },
        DELETE_CHILD: {
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
