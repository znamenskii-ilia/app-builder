import { Page } from "../Page";

export type Application = {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  pages: Page[];
};
