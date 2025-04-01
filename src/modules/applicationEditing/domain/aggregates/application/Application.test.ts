import { describe, expect, it } from "vitest";

import { deleteEntity } from "./Application";
import { createApplication } from "./Application.factory";
import { createApplicationEntity } from "./ApplicationEntity.factory";

describe("deletePage", () => {
  it("should delete pages", () => {
    const application = createApplication({
      pages: [
        createApplicationEntity({ id: "1", type: "page" }),
        createApplicationEntity({ id: "2", type: "page" }),
      ],
      functions: [createApplicationEntity({ id: "1", type: "function" })],
      dataSources: [createApplicationEntity({ id: "1", type: "dataSource" })],
    });

    const newApplication = deleteEntity(application, "2", "page");

    expect(newApplication.pages).toEqual([application.pages[0]]);
    expect(newApplication.functions).toEqual(application.functions);
    expect(newApplication.dataSources).toEqual(application.dataSources);
  });

  it("should delete functions", () => {
    const application = createApplication({
      pages: [createApplicationEntity({ id: "1", type: "page" })],
      functions: [
        createApplicationEntity({ id: "1", type: "function" }),
        createApplicationEntity({ id: "2", type: "function" }),
      ],
      dataSources: [createApplicationEntity({ id: "1", type: "dataSource" })],
    });

    const newApplication = deleteEntity(application, "1", "function");

    expect(newApplication.pages).toEqual(application.pages);
    expect(newApplication.functions).toEqual([application.functions[1]]);
    expect(newApplication.dataSources).toEqual(application.dataSources);
  });

  it("should delete data sources", () => {
    const application = createApplication({
      pages: [createApplicationEntity({ id: "1", type: "page" })],
      functions: [createApplicationEntity({ id: "1", type: "function" })],
      dataSources: [createApplicationEntity({ id: "1", type: "dataSource" })],
    });

    const newApplication = deleteEntity(application, "1", "dataSource");

    expect(newApplication.pages).toEqual(application.pages);
    expect(newApplication.functions).toEqual(application.functions);
    expect(newApplication.dataSources).toEqual([]);
  });
});
