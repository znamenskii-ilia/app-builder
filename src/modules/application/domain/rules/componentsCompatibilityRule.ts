import { ComponentType } from "../entities/Component";

/**
 * Check if one component can be a child of another component
 */
export const componentsCompatibilityRuleSatisfied = (
  parentComponentType: ComponentType,
  childComponentType: ComponentType,
): boolean => {
  if (parentComponentType === "Box") {
    return (
      childComponentType === "Button" ||
      childComponentType === "Heading" ||
      childComponentType === "Text"
    );
  }

  return true;
};
