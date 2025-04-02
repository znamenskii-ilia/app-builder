import { faker } from "@faker-js/faker";

export type ApplicationDto = {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  pages: {
    id: string;
    name: string;
  }[];
  functions: {
    id: string;
    name: string;
  }[];
  dataSources: {
    id: string;
    name: string;
  }[];
};

export const makeApplicationDto = (dto: Partial<ApplicationDto> = {}): ApplicationDto => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  lastModified: faker.date.recent().getTime(),
  pages: [],
  functions: [],
  dataSources: [],
  ...dto,
});
