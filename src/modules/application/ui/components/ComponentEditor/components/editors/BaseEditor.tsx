import { Trash2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../../../../../common/ui/components/button";
import { Component } from "../../../../../domain/entities";

export type BaseEditorProps<TComponent extends Component> = PropsWithChildren<{
  component: TComponent;
  onComponentDelete: (componentId: string) => void;
}>;

const makeStyles = tv({
  slots: {
    base: "flex justify-between items-center",
    name: "flex gap-2 mb-2",
  },
});

export const BaseEditor = <TComponent extends Component>({
  children,
  component,
  onComponentDelete,
}: BaseEditorProps<TComponent>) => {
  const styles = makeStyles();

  return (
    <>
      <div className={styles.base()}>
        <div className={styles.name()}>{component.component}</div>
        <Button size="icon-sm" variant="ghost" onClick={() => onComponentDelete(component.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {children}
    </>
  );
};
