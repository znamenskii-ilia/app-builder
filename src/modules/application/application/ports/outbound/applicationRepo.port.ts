import { Application } from "../../../domain/entities/Application/Application";

export type ApplicationRepo = {
  // createPage: (pageName: string) => Promise<Page>;
  findById: (applicationId: string) => Promise<Application>;
  save: (application: Application) => Promise<void>;
  // deletePage: (pageId: string) => Promise<void>;
};
