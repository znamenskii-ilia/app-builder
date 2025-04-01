import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Link } from "@tanstack/react-router";
import { ArrowUpDown, Braces, PanelsTopLeft, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/common/ui/utils";
import type { ApplicationEntityType } from "@/modules/applicationEditing/domain";

type WorkareaTabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

const WorkareaTabs = ({ className, ...props }: WorkareaTabsProps) => {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />
  );
};

type WorkareaTabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

const WorkareaTabsList = ({ className, ...props }: WorkareaTabsListProps) => {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 w-full items-center border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
      {...props}
    />
  );
};

type WorkareaTabsTriggerProps = {
  to: string;
  entityType: ApplicationEntityType;
  isSelected: boolean;
  children: React.ReactNode;
};

const WorkareaTabsTrigger = ({
  children,
  to,
  isSelected,
  entityType,
  ...props
}: WorkareaTabsTriggerProps) => {
  const resolveIcon = () => {
    if (entityType === "page") return <PanelsTopLeft size={22} />;
    if (entityType === "data-source") return <ArrowUpDown size={20} />;
    if (entityType === "function") return <Braces size={18} />;

    return null;
  };

  return (
    <div className="group relative">
      <Link
        to={to}
        className={cn(
          "inline-flex h-10 items-center justify-center border-b-2 border-transparent py-1 pr-8 pl-4 text-sm font-medium whitespace-nowrap text-neutral-500 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-current data-[state=active]:text-neutral-900",
          isSelected && "border-current text-neutral-900",
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          {resolveIcon()}
          {children}
        </div>
      </Link>
      <Link
        to={to}
        className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <X />
      </Link>
    </div>
  );
};

export { WorkareaTabs, WorkareaTabsList, WorkareaTabsTrigger };
