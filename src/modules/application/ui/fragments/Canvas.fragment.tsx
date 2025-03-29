import { useSelector } from "@xstate/react";
import { memo, PropsWithChildren } from "react";
import { PageActor } from "../../application/interactors/page/page.logic";
import {
  selectPageMaybe,
  selectRootComponent,
} from "../../application/interactors/page/page.selectors";
import { PageEditorActor } from "../../application/interactors/pageEditor/pageEditor.logic";
import type { Component } from "../../domain";
import {
  BoxComponent,
  ButtonComponent,
  Canvas,
  HeadingComponent,
  ImageComponent,
  TextComponent,
} from "../components/Canvas";

type CanvasItemFragmentProps = {
  component: Component;
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
};

const CanvasItemFragment = memo(
  ({ component, pageActor, pageEditorActor }: CanvasItemFragmentProps) => {
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
              <CanvasItemFragment
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
  },
);

type CanvasFragmentProps = PropsWithChildren<{
  pageActor: PageActor;
  pageEditorActor: PageEditorActor;
}>;

export const CanvasFragment = ({ pageActor, pageEditorActor }: CanvasFragmentProps) => {
  const rootComponent = useSelector(pageActor, selectRootComponent);

  return (
    <Canvas
      onBackgroundClick={() =>
        pageEditorActor.send({ type: "SELECT_COMPONENT", componentId: null })
      }
    >
      <CanvasItemFragment
        component={rootComponent}
        pageActor={pageActor}
        pageEditorActor={pageEditorActor}
      />
    </Canvas>
  );
};
