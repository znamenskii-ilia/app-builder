import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSelector } from "@xstate/react";
import { memo } from "react";

import {
  PageActor,
  selectPageMaybe,
} from "@/modules/applicationEditing/ui/stores/interactors/page";
import { PageEditorActor } from "@/modules/applicationEditing/ui/stores/interactors/pageEditor";
import { type Component, getRootComponent } from "@/modules/applicationEditing/domain";
import {
  PageExplorer,
  PageExplorerItem,
} from "@/modules/applicationEditing/ui/components/PageExplorer";

type PageExplorerItemFragmentProps = {
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
  component: Component;
  level: number;
};

const PageExplorerItemFragment = memo(
  ({ pageActor, pageEditorActor, component, level }: PageExplorerItemFragmentProps) => {
    const page = useSelector(pageActor, selectPageMaybe);
    const selectedComponentId = useSelector(
      pageEditorActor,
      (state) => state.context.selectedComponentId,
    );
    const highlightedComponentId = useSelector(
      pageEditorActor,
      (state) => state.context.highlightedComponentId,
    );

    if (!page) return null;

    return (
      <PageExplorerItem
        componentId={component.id}
        componentName={component.name}
        componentType={component.component}
        level={level}
        isSelected={selectedComponentId === component.id}
        isHighlighted={highlightedComponentId === component.id}
        onMouseOver={() =>
          pageEditorActor.send({
            type: "HIGHLIGHT_COMPONENT",
            componentId: component.id,
          })
        }
        onMouseOut={() =>
          pageEditorActor.send({
            type: "HIGHLIGHT_COMPONENT",
            componentId: null,
          })
        }
        onSelect={() =>
          pageEditorActor.send({
            type: "SELECT_COMPONENT",
            componentId: component.id,
          })
        }
      >
        {component.children.map((componentId) => (
          <PageExplorerItemFragment
            pageActor={pageActor}
            pageEditorActor={pageEditorActor}
            component={page.children[componentId]}
            level={level + 1}
            key={componentId}
          />
        ))}
      </PageExplorerItem>
    );
  },
);

type PageExplorerFragmentProps = {
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
};

export const PageExplorerFragment = memo(
  ({ pageActor, pageEditorActor }: PageExplorerFragmentProps) => {
    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Added to prevent accidental drag and avoid conflicts with click events
      },
    });
    const sensors = useSensors(mouseSensor);
    const page = useSelector(pageActor, selectPageMaybe);

    if (!page) return null;

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
      if (!over) return;

      pageActor.send({
        type: "MOVE_COMPONENT",
        componentId: active.id as string,
        targetComponentId: over.data.current?.componentId,
        position: over.data.current?.position,
      });
    };

    return (
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]} sensors={sensors}>
        <PageExplorer>
          <PageExplorerItemFragment
            pageActor={pageActor}
            pageEditorActor={pageEditorActor}
            component={getRootComponent(page)}
            level={0}
            key={getRootComponent(page).id}
          />
        </PageExplorer>
      </DndContext>
    );
  },
);
