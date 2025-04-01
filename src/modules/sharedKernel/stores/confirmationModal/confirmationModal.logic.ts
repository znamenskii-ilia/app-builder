import { ActorRefFrom, assign, setup } from "xstate";

import { ConfirmationModalEvents } from "./confirmationModal.events";

export type ConfirmationModalActor = ActorRefFrom<typeof confirmationModalLogic>;
export const confirmationModalLogic = setup({
  types: {
    context: {} as {
      id: string | null;
      onConfirm?: () => void;
      onDiscard?: () => void;
    },
    events: {} as ConfirmationModalEvents,
  },
}).createMachine({
  id: "confirmationModalActor",
  context: () => ({
    id: null,
  }),
  initial: "idle",
  states: {
    idle: {
      entry: assign({
        id: null,
      }),
      on: {
        OPEN: {
          target: "open",
          actions: assign({
            id: ({ event }) => event.id,
          }),
        },
      },
    },
    open: {
      on: {
        DISCARD: {
          target: "idle",
        },
        CONFIRM: {
          target: "idle",
          actions: ({ context }) => {
            context.onConfirm?.();
          },
        },
      },
    },
  },
});
