import { faker } from "@faker-js/faker";

import { ApplicationEntity } from "./ApplicationEntity";

export const createApplicationEntity = (
  applicationEntity: Partial<ApplicationEntity> = {},
): ApplicationEntity => {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    type: faker.helpers.arrayElement(["page", "data-source", "function"]),
    ...applicationEntity,
  };
};
