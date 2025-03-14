import { assign, sendParent, setup } from "xstate";
import { Component } from "../../domain";
import {
  newButtonComponent,
  newColumnComponent,
  newHeadingComponent,
} from "../../domain/Component/components";
import { newRowComponent } from "../../domain/Component/components/RowComponent";
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
      },
    },
    hover: {
      on: {
        HOVER_LEAVE: { target: "idle" },
      },
    },
    selected: {
      on: {
        UPDATE: {
          actions: assign(
            ({ event, context }): ComponentContext => ({
              ...event.component,
              children: context.children,
            }),
          ),
        },
      },
    },
  },
});
