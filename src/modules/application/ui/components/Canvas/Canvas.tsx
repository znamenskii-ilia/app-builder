import { PropsWithChildren } from "react";
import { CanvasSkeleton } from "./Canvas.skeleton";

type CanvasProps = PropsWithChildren<{
  onBackgroundClick: () => void;
}>;

export const Canvas = ({ children, onBackgroundClick }: CanvasProps) => {
  return (
    <div className="flex flex-1 p-4 items-start bg-white" tabIndex={0} onClick={onBackgroundClick}>
      {children}
    </div>
  );
};

Canvas.Skeleton = CanvasSkeleton;
