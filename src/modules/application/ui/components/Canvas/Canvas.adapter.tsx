import { useSelector } from "@xstate/react";
import { memo, PropsWithChildren } from "react";
import { PageActor } from "../../../application/interactors/page/page.logic";
import {
  selectPageMaybe,
  selectRootComponent,
} from "../../../application/interactors/page/page.selectors";
import { PageEditorActor } from "../../../application/interactors/pageEditor/pageEditor.logic";
import { Component } from "../../../domain/entities";
import { Canvas } from "./Canvas";
import { BoxComponent } from "./components/BoxComponent";
import { ButtonComponent } from "./components/ButtonComponent";
import { HeadingComponent } from "./components/HeadingComponent";
import { ImageComponent } from "./components/ImageComponent";
import { TextComponent } from "./components/TextComponent";

type CanvasComponentProps = {
  component: Component;
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
};

const CanvasComponent = memo(({ component, pageActor, pageEditorActor }: CanvasComponentProps) => {
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

  const { component: componentType } = component;

  switch (componentType) {
    case "Box":
      return (
        <BoxComponent
          component={component}
          isSelected={selectedComponentId === component.id}
          isHighlighted={highlightedComponentId === component.id}
          onMouseOver={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
          }
          onMouseOut={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })
          }
          onClick={() =>
            pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
          }
          key={component.id}
        >
          {component.children.map((childId) => (
            <CanvasComponent
              component={page.children[childId]}
              pageActor={pageActor}
              pageEditorActor={pageEditorActor}
              key={page.children[childId].id}
            />
          ))}
        </BoxComponent>
      );
    case "Button":
      return (
        <ButtonComponent
          component={component}
          isSelected={selectedComponentId === component.id}
          isHighlighted={highlightedComponentId === component.id}
          onMouseOver={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
          }
          onMouseOut={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })
          }
          onClick={() =>
            pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
          }
          key={component.id}
        />
      );
    case "Text":
      return (
        <TextComponent
          component={component}
          isSelected={selectedComponentId === component.id}
          isHighlighted={highlightedComponentId === component.id}
          onMouseOver={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
          }
          onMouseOut={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })
          }
          onClick={() =>
            pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
          }
          key={component.id}
        />
      );
    case "Heading":
      return (
        <HeadingComponent
          component={component}
          isSelected={selectedComponentId === component.id}
          isHighlighted={highlightedComponentId === component.id}
          onMouseOver={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
          }
          onMouseOut={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })
          }
          onClick={() =>
            pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
          }
          key={component.id}
        />
      );
    case "Image":
      return (
        <ImageComponent
          component={component}
          isSelected={selectedComponentId === component.id}
          isHighlighted={highlightedComponentId === component.id}
          onMouseOver={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: component.id })
          }
          onMouseOut={() =>
            pageEditorActor.send({ type: "HIGHLIGHT_COMPONENT", componentId: null })
          }
          onClick={() =>
            pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: component.id })
          }
          key={component.id}
        />
      );
    default: {
      const exhaustiveCheck: never = componentType;

      throw new Error(`Unknown component type: ${exhaustiveCheck}`);
    }
  }
});

type CanvasAdapterProps = PropsWithChildren<{
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
}>;

export const CanvasAdapter = ({ pageActor, pageEditorActor }: CanvasAdapterProps) => {
  const rootComponent = useSelector(pageActor, selectRootComponent);

  return (
    <Canvas
      onBackgroundClick={() =>
        pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: null })
      }
    >
      <CanvasComponent
        component={rootComponent}
        pageActor={pageActor}
        pageEditorActor={pageEditorActor}
      />
    </Canvas>
  );
};
