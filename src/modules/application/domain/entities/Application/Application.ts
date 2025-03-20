import { ApplicationEntity } from "./ApplicationEntity";

export type Application = {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  pages: ApplicationEntity[];
  functions: ApplicationEntity[];
  dataSources: ApplicationEntity[];
};
