export * from "./page.interface";
export * from "./page.selectors";
import { fromPromise } from "xstate";
import { Page } from "../../../domain/entities";
import { pageLocalStorageRepo } from "../../../infrastructure/repos/pageLocalStorage.repo";
import { pageLogic as pageLogicImpl } from "./page.logic";

export const pageLogic = pageLogicImpl.provide({
  actors: {
    loadPage: fromPromise(async ({ input }: { input: { pageId: string } }) =>
      pageLocalStorageRepo.findById(input.pageId),
    ),
    savePage: fromPromise(async ({ input }: { input: { page: Page } }) =>
      pageLocalStorageRepo.save(input.page),
    ),
  },
});
