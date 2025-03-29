import type { Page } from "../../../domain";

export type PageRepo = {
  // createPage: (pageName: string) => Promise<Page>;
  findById: (pageId: string) => Promise<Page>;
  save: (page: Page) => Promise<void>;
  // deletePage: (pageId: string) => Promise<void>;
};
