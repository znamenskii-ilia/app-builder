import { Trash2 } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { tv } from "tailwind-variants";

import { Button } from "@/common/ui/components/button";
import { Input } from "@/common/ui/components/input";
import type { Component } from "@/modules/applicationEditing/domain";

export type BaseEditorProps<TComponent extends Component> = PropsWithChildren<{
  component: TComponent;
  onComponentRename: (name: string) => void;
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
  onComponentRename,
  onComponentDelete,
}: BaseEditorProps<TComponent>) => {
  const styles = makeStyles();
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <>
      <div className={styles.base()}>
        {isEditingName ? (
          <Input
            className={styles.name()}
            value={component.name}
            onChange={(e) => onComponentRename(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setIsEditingName(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div className={styles.name()} onClick={() => setIsEditingName(true)}>
            {component.name}
          </div>
        )}
        <Button size="icon-sm" variant="ghost" onClick={() => onComponentDelete(component.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </>
  );
};
