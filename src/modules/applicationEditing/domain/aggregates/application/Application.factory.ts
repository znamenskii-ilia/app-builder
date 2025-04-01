import { faker } from "@faker-js/faker";

import { Application } from "./Application";

export const createApplication = (application: Partial<Application> = {}): Application => {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    lastModified: faker.date.recent().getTime(),
    pages: [],
    functions: [],
    dataSources: [],
    ...application,
  };
};
