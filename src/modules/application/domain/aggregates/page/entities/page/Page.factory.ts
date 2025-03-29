import { faker } from "@faker-js/faker";

import { Page } from "./Page";

export const makePage = (page: Partial<Page>): Page => ({
  id: faker.string.nanoid(3),
  applicationId: faker.string.nanoid(3),
  name: faker.lorem.word(),
  metadata: {
    title: faker.lorem.word(),
  },
  children: {},
  childrenOrder: [],
  ...page,
});
