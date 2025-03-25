import { useSelector } from "@xstate/react";
import { PropsWithChildren } from "react";
import { PageActor } from "../../../application/interactors/page/page.logic";
import { Canvas } from "./Canvas";
import { resolveComponent } from "./utils";

type CanvasAdapterProps = PropsWithChildren<{
  pageActor: PageActor;
}>;

export const CanvasAdapter = ({ pageActor }: CanvasAdapterProps) => {
  const page = useSelector(pageActor, (state) => state.context.page);

  return (
    <Canvas onBackgroundClick={() => pageActor.send({ type: "RESET_SELECTION" })}>
      {page?.childrenOrder.map((childId) => resolveComponent(page.children, childId))}
    </Canvas>
  );
};
