import { ComponentActor } from "../../../interactors/component";
import { BoxComponent } from "./components/BoxComponent";
import { ButtonComponent } from "./components/ButtonComponent";
import { HeadingComponent } from "./components/HeadingComponent";
import { ImageComponent } from "./components/ImageComponent";
import { TextComponent } from "./components/TextComponent";

export const resolveComponent = (pageChildren: Record<string, ComponentActor>, childId: string) => {
  const actor = pageChildren[childId];
  const context = actor.getSnapshot().context;

  switch (context.component) {
    case "Box":
      return <BoxComponent pageChildren={pageChildren} actor={actor} key={context.id} />;
    case "Button":
      return <ButtonComponent actor={actor} key={context.id} />;
    case "Text":
      return <TextComponent actor={actor} key={context.id} />;
    case "Heading":
      return <HeadingComponent actor={actor} key={context.id} />;
    case "Image":
      return <ImageComponent actor={actor} key={context.id} />;
    default: {
      const exhaustiveCheck: never = context.component;

      throw new Error(`Unknown component type: ${exhaustiveCheck}`);
    }
  }
};
