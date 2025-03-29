import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { createFileRoute } from "@tanstack/react-router";
import { useActor, useSelector } from "@xstate/react";
import { useEffect } from "react";
import { Button } from "../../../common/ui/components/button";
import {
  pageLogic,
  selectComponentMaybe,
  selectPageMaybe,
} from "../../../modules/application/application/interactors/page";
import { pageEditorLogic } from "../../../modules/application/application/interactors/pageEditor/pageEditor.logic";
import { Canvas } from "../../../modules/application/ui/components/Canvas";
import { CanvasAdapter } from "../../../modules/application/ui/components/Canvas/Canvas.adapter";
import { ComponentEditorAdapter } from "../../../modules/application/ui/components/ComponentEditor/ComponentEditor.adapter";
import { ComponentsLibraryAdapter } from "../../../modules/application/ui/components/ComponentsLibrary/ComponentsLibrary.adapter";
import { PageExplorerAdapter } from "../../../modules/application/ui/components/PageExplorer/PageExplorer.adapter";

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
  const selectedComponent = useSelector(pageActor[2], (state) =>
    state.context.page ? selectComponentMaybe("ywj0exx5dm")(state) : null,
  );

  // const pageJson = useSelector(pageActor[2], selectToJson);
  // console.log("pageJson", pageJson);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    pageActor[1]({
      type: "ADD_COMPONENT",
      componentType: event.active.id as "Button" | "Heading" | "Text",
      targetComponentId: event.over.id as string,
    });
  };

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    // if (event.key === "Escape") {
    //   pageActor[1]({ type: "UNSELECT" });
    // }

    if (event.key === "Backspace" && (event.metaKey || event.ctrlKey) && selectedComponent) {
      pageActor[1]({ type: "DELETE_COMPONENT", componentId: selectedComponent.id });
    }
  };

  // EFFECTS
  useEffect(() => {
    if (pageActor[0].context.pageId !== entityId) {
      pageActor[1]({ type: "CHANGE_PAGE", pageId: entityId });
    }
  }, [pageActor, entityId]);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener("keydown", handleWindowKeyDown, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, [selectedComponent]);

  // RENDER
  if (pageActor[0].matches("loading")) {
    return (
      <div className="flex flex-1">
        <div className="w-[200px] border-r border-gray-200 p-2"></div>

        <div className="flex-1 flex flex-col items-stretch justify-stretch overflow-hidden">
          <Canvas.Skeleton />
        </div>

        <div className="w-[20%] min-w-[220px] max-w-[300px] border-l border-gray-200 "></div>
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
          <PageExplorerAdapter pageActor={pageActor[2]} pageEditorActor={pageEditorActor[2]} />
        </div>

        <div className="flex-1 flex flex-col items-stretch justify-stretch overflow-hidden">
          <CanvasAdapter pageActor={pageActor[2]} pageEditorActor={pageEditorActor[2]} />
        </div>

        <div className="p-2 w-[270px] border-l border-gray-200 ">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => pageActor[1]({ type: "SAVE" })}
              size="sm"
              color="primary"
              // isLoading={pageActor[0].matches("savingPage")}
            >
              Save
            </Button>
          </div>
          {selectedComponent ? (
            <ComponentEditorAdapter pageActor={pageActor[2]} />
          ) : (
            <ComponentsLibraryAdapter />
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
