export * from "./page.interface";
export * from "./page.selectors";
import { fromPromise } from "xstate";
import { pageMemoryRepo } from "../../infrastructure/repos/page.repo";
import { pageLogic as pageLogicImpl } from "./page.logic";

export const pageLogic = pageLogicImpl.provide({
  actors: {
    loadPage: fromPromise(async ({ input }: { input: { pageId: string } }) => {
      const page = await pageMemoryRepo.loadPage(input.pageId);

      return page;
    }),
  },
});
