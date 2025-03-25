import { Page } from "../../domain/entities";

export type PageRepo = {
  loadPage: (pageId: string) => Promise<Page>;
};
