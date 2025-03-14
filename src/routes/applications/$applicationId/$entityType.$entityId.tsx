import { createFileRoute } from "@tanstack/react-router";
import { useActor, useSelector } from "@xstate/react";
import { useEffect } from "react";
import { Button } from "../../../common/ui/components/button";
import { pageLogic } from "../../../modules/applicationEditor/interactors/page";
import { Canvas } from "../../../modules/applicationEditor/ui/components/Canvas";
import { resolveComponent } from "../../../modules/applicationEditor/ui/components/Canvas/utils";
import { ComponentEditorFragment } from "../../../modules/applicationEditor/ui/fragments/ComponentEditor";

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

  useEffect(() => {
    if (pageActor[0].context.pageId !== entityId) {
      pageActor[1]({ type: "CHANGE_PAGE", pageId: entityId });
    }
  }, [pageActor, entityId]);

  if (pageActor[0].matches("loadingPage")) {
    return <div>Loading...</div>;
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="flex flex-1">
      {/* <div className="w-[250px] border-r border-gray-200">awd</div> */}
      <div className="flex-1">
        <Button
          onClick={() =>
            pageActor[1]({
              type: "ADD_COMPONENT",
              componentType: "Button",
              targetComponentId: "column-1",
            })
          }
        >
          Add button
        </Button>
        <Canvas>
          {page.childrenOrder.map((childId) => resolveComponent(page.children, childId))}
        </Canvas>
      </div>

      <div className="w-[20%] min-w-[200px] max-w-[300px] border-l border-gray-200 ">
        {pageActor[0].context.selectedComponentId && (
          <ComponentEditorFragment pageActor={pageActor[2]} />
        )}
      </div>
    </div>
  );
}

function FunctionPage() {
  return <div>Function</div>;
}

function DataSourcePage() {
  return <div>DataSource</div>;
}
