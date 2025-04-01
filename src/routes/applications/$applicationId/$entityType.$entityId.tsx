import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { createFileRoute } from "@tanstack/react-router";
import { useActor, useSelector } from "@xstate/react";
import { useCallback, useEffect } from "react";

import { Button } from "@/common/ui/components/button";
import {
  pageLogic,
  selectComponentMaybe,
  selectPageMaybe,
} from "@/modules/applicationEditing/ui/stores/interactors/page";
import { pageEditorLogic } from "@/modules/applicationEditing/ui/stores/interactors/pageEditor";
import { Canvas } from "@/modules/applicationEditing/ui/components/Canvas";
import { CanvasFragment } from "@/modules/applicationEditing/ui/fragments/Canvas.fragment";
import { ComponentEditorFragment } from "@/modules/applicationEditing/ui/fragments/ComponentEditor.fragment";
import { ComponentsLibraryFragment } from "@/modules/applicationEditing/ui/fragments/ComponentsLibrary.fragment";
import { PageExplorerFragment } from "@/modules/applicationEditing/ui/fragments/PageExplorer.fragment";

export const Route = createFileRoute("/applications/$applicationId/$entityType/$entityId")({
  component: EntityPage,
});

function EntityPage() {
  const { entityType } = Route.useParams();

  switch (entityType) {
    case "pages":
      return <PagePage />;
    case "functions":
      return <FunctionPage />;
    case "data-sources":
      return <DataSourcePage />;
    default:
      return null;
  }
}

function PagePage() {
  const { entityId } = Route.useParams();
  const pageActor = useActor(pageLogic, {
    input: {
      pageId: entityId,
    },
  });
  const pageEditorActor = useActor(pageEditorLogic, {
    input: {
      pageId: entityId,
    },
  });

  const page = useSelector(pageActor[2], selectPageMaybe);
  const selectedComponentId = useSelector(
    pageEditorActor[2],
    (state) => state.context.selectedComponentId,
  );
  const selectedComponent = useSelector(pageActor[2], selectComponentMaybe(selectedComponentId));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    pageActor[1]({
      type: "ADD_COMPONENT",
      componentType: event.active.id as "Button" | "Heading" | "Text",
      targetComponentId: event.over.id as string,
    });
  };

  const handleWindowKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        pageEditorActor[1]({ type: "SELECT_COMPONENT", componentId: null });
      }

      if (event.key === "Backspace" && (event.metaKey || event.ctrlKey) && selectedComponent) {
        pageActor[1]({
          type: "DELETE_COMPONENT",
          componentId: selectedComponent.id,
        });
      }
    },
    [pageActor, pageEditorActor, selectedComponent],
  );

  // EFFECTS
  useEffect(() => {
    if (pageActor[0].context.pageId !== entityId) {
      pageActor[1]({ type: "CHANGE_PAGE", pageId: entityId });
    }
  }, [pageActor, entityId]);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener("keydown", handleWindowKeyDown, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [selectedComponent, handleWindowKeyDown]);

  // RENDER
  if (pageActor[0].matches("loading")) {
    return (
      <div className="flex flex-1">
        <div className="w-[200px] border-r border-gray-200 p-2"></div>

        <div className="flex flex-1 flex-col items-stretch justify-stretch overflow-hidden">
          <Canvas.Skeleton />
        </div>

        <div className="w-[20%] max-w-[300px] min-w-[220px] border-l border-gray-200"></div>
      </div>
    );
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <DndContext
      // modifiers={[snapCenterToCursor]}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1">
        <div className="w-[270px] border-r border-gray-200 py-1">
          <PageExplorerFragment pageActor={pageActor[2]} pageEditorActor={pageEditorActor[2]} />
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-stretch overflow-hidden">
          <CanvasFragment pageActor={pageActor[2]} pageEditorActor={pageEditorActor[2]} />
        </div>

        <div className="w-[270px] border-l border-gray-200 p-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => pageActor[1]({ type: "SAVE" })}
              size="sm"
              color="primary"
              isLoading={pageActor[0].matches({ loaded: "saving" })}
            >
              Save
            </Button>
          </div>
          {selectedComponent ? (
            <ComponentEditorFragment
              pageActor={pageActor[2]}
              pageEditorActor={pageEditorActor[2]}
            />
          ) : (
            <ComponentsLibraryFragment />
          )}
        </div>
      </div>
    </DndContext>
  );
}

function FunctionPage() {
  return <div>Function</div>;
}

function DataSourcePage() {
  return <div>DataSource</div>;
}
