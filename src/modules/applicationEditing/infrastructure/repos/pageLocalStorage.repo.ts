import { newBoxComponent, Page } from "@/modules/applicationEditing/domain";
import { PageRepo } from "@/modules/applicationEditing/ui/stores/ports/outbound/pageRepo.port";

const findPage = async (pageId: string) => {
  const page = localStorage.getItem(`page-${pageId}`);

  if (!page) {
    const page: Page = {
      id: pageId,
      applicationId: "1",
      name: "New Page",
      metadata: {
        title: "New Page",
      },
      children: {
        root: newBoxComponent("root"),
      },
      childrenOrder: ["root"],
    };

    return page;
  }

  return JSON.parse(page);
};

const savePage = async (page: Page) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  localStorage.setItem(`page-${page.id}`, JSON.stringify(page));
};

export const pageLocalStorageRepo: PageRepo = {
  findById: findPage,
  save: savePage,
};
