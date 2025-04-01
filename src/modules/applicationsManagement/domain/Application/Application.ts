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
  datasources: {
    id: string;
    name: string;
  }[];
};
