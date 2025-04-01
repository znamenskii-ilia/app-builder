import { Heading, Image, RectangleHorizontal, SquareDashed, Text } from "lucide-react";

import type { ComponentType } from "@/modules/applicationEditing/domain";

type ComponentIconProps = {
  componentType: ComponentType;
};

export const ComponentIcon = ({ componentType }: ComponentIconProps) => {
  switch (componentType) {
    case "Box":
      return <SquareDashed width={16} height={16} />;
    case "Button":
      return <RectangleHorizontal width={16} height={16} />;
    case "Text":
      return <Text width={16} height={16} />;
    case "Heading":
      return <Heading width={16} height={16} />;
    case "Image":
      return <Image width={16} height={16} />;
    default:
      return null;
  }
};
