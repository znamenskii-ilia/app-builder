import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";

type SidebarSectionProps = PropsWithChildren<{
  title: string;
  isOpenDefault?: boolean;
}>;

export const SidebarSection = ({ title, isOpenDefault = false, children }: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  useEffect(() => {
    if (isOpenDefault) {
      setIsOpen(true);
    }
  }, [isOpenDefault]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center p-1 w-full bg-gray-200">
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <div className="ml-1">{title}</div>
      </CollapsibleTrigger>
      <CollapsibleContent className="">{children}</CollapsibleContent>
    </Collapsible>
  );
};
