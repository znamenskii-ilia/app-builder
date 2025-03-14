import { PropsWithChildren } from "react";

type CanvasProps = PropsWithChildren;

export const Canvas = ({ children }: CanvasProps) => {
  return (
    <div data-component="Canvas" className="">
      {children}
    </div>
  );
};
