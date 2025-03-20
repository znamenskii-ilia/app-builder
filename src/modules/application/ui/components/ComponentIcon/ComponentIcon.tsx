import { ComponentType } from "../../../domain/entities";
import boxIcon from "./icons/box.svg";
import buttonIcon from "./icons/button.svg";

type ComponentIconProps = {
  className?: string;
  componentType: ComponentType;
};

export const ComponentIcon = ({ className, componentType }: ComponentIconProps) => {
  switch (componentType) {
    case "Box":
      return <img className={className} src={boxIcon} alt="Box" />;
    case "Button":
      return <img className={className} src={buttonIcon} alt="Button" />;
    default:
      return null;
  }
};
