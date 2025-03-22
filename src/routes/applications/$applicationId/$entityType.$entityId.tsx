import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { createFileRoute } from "@tanstack/react-router";
import { useActor, useSelector } from "@xstate/react";
import { useEffect } from "react";
import {
  pageLogic,
  selectSelectedComponent,
  selectToJson,
} from "../../../modules/application/interactors/page";
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
  const page = useSelector(pageActor[2], (state) => state.context.page);
  const selectedComponent = useSelector(pageActor[2], (state) =>
    state.context.page ? selectSelectedComponent(state) : null,
  );
  const pageJson = useSelector(pageActor[2], selectToJson);

  useEffect(() => {
    if (pageActor[0].context.pageId !== entityId) {
      pageActor[1]({ type: "CHANGE_PAGE", pageId: entityId });
    }
  }, [pageActor, entityId]);

  if (pageActor[0].matches("loadingPage")) {
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
  // console.log(pageJson);
  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    pageActor[1]({
      type: "ADD_COMPONENT",
      componentType: event.active.id as "Button" | "Heading" | "Text",
      targetComponentId: event.over.id as string,
    });
  };

  return (
    <DndContext modifiers={[snapCenterToCursor]} onDragEnd={handleDragEnd}>
      <div className="flex flex-1">
        <div className="w-[200px] border-r border-gray-200 py-2">
          <PageExplorerAdapter pageActor={pageActor[2]} />
        </div>

        <div className="flex-1 flex flex-col items-stretch justify-stretch overflow-hidden">
          <CanvasAdapter pageActor={pageActor[2]} />
        </div>

        <div className="w-[20%] p-3 min-w-[220px] max-w-[270px] border-l border-gray-200 ">
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
