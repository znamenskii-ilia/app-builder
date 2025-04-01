export type Application = {
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
