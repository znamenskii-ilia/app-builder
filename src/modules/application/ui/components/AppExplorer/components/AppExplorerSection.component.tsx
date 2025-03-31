import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";

type AppExplorerSectionProps = PropsWithChildren<{
  title: string;
  isOpenDefault?: boolean;
}>;

export const AppExplorerSection = ({
  title,
  isOpenDefault = false,
  children,
}: AppExplorerSectionProps) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  useEffect(() => {
    if (isOpenDefault) {
      setIsOpen(true);
    }
  }, [isOpenDefault]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center bg-gray-200 p-1">
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <div className="ml-1">{title}</div>
      </CollapsibleTrigger>
      <CollapsibleContent className="">{children}</CollapsibleContent>
    </Collapsible>
  );
};
