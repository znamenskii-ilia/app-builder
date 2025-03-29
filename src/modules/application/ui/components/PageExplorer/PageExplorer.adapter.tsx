import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSelector } from "@xstate/react";
import { memo } from "react";
import { selectPageMaybe } from "../../../application/interactors/page";
import { PageActor } from "../../../application/interactors/page/page.logic";
import { PageEditorActor } from "../../../application/interactors/pageEditor/pageEditor.logic";
import { Component, getRootComponent } from "../../../domain/entities";
import { PageExplorer } from "./PageExplorer.component";
import { PageExplorerItem } from "./PageExplorerItem.component";

type PageExplorerItemAdapterProps = {
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
  component: Component;
  level: number;
};

const PageExplorerItemAdapter = memo(
  ({ pageActor, pageEditorActor, component, level }: PageExplorerItemAdapterProps) => {
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
          pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
        }
        onMouseOut={() => pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })}
        onSelect={() =>
          pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
        }
      >
        {component.children.map((componentId) => (
          <PageExplorerItemAdapter
            pageActor={pageActor}
            pageEditorActor={pageEditorActor}
            component={page.children[componentId]}
            level={(level + 1) as 0 | 1 | 2 | 3 | 4}
            key={componentId}
          />
        ))}
      </PageExplorerItem>
    );
  },
);

type PageExplorerAdapterProps = {
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
};

export const PageExplorerAdapter = memo(
  ({ pageActor, pageEditorActor }: PageExplorerAdapterProps) => {
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
          <PageExplorerItemAdapter
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
