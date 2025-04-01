import { ActorRefFromLogic, assign, setup } from "xstate";
import type { PageEditorEvents } from "./pageEditor.ports";

export type PageEditorActor = ActorRefFromLogic<typeof pageEditorLogic>;

export const pageEditorLogic = setup({
  types: {
    context: {} as {
      selectedComponentId: string | null;
      highlightedComponentId: string | null;
    },
    events: {} as PageEditorEvents,
  },
}).createMachine({
  id: "pageEditorSchema",
  context: () => ({
    selectedComponentId: null,
    highlightedComponentId: null,
  }),
  on: {
    SELECT_COMPONENT: {
      actions: [assign(({ event }) => ({ selectedComponentId: event.componentId }))],
    },
    HIGHLIGHT_COMPONENT: {
      actions: [assign(({ event }) => ({ highlightedComponentId: event.componentId }))],
    },
  },
});
