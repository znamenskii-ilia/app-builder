export type { PageActor } from "./page.logic";
export * from "./page.ports";
export * from "./page.selectors";
import { fromPromise } from "xstate";

import type { Page } from "@/modules/applicationEditing/domain";
import { pageLocalStorageRepo } from "@/modules/applicationEditing/infrastructure/repos/pageLocalStorage.repo";

import { pageLogic as pageLogicImpl } from "./page.logic";

export const pageLogic = pageLogicImpl.provide({
  actors: {
    loadPage: fromPromise(async ({ input }: { input: string }) =>
      pageLocalStorageRepo.findById(input),
    ),
    savePage: fromPromise(async ({ input }: { input: Page }) => pageLocalStorageRepo.save(input)),
  },
});
