import { Application } from "../domain";

type CreateApplicationParams = {
  type: string;
  template: string;
  name: string;
  description: string;
};

export const getApplications = async (): Promise<Application[]> => {
  return JSON.parse(localStorage.getItem("applications") || "[]");
};

export const createApplication = async (
  application: CreateApplicationParams,
): Promise<{ id: string }> => {
  console.log("createApplication", application);

  const applications = await getApplications();

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(application),
  }).then((response) => response.json());

  const newApplication: Application = {
    id: response.id,
    ...application,
    lastModified: Date.now(),
    pages: [],
    functions: [],
    dataSources: [],
  };

  localStorage.setItem("applications", JSON.stringify([...applications, newApplication]));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: response.id,
      });
    }, 1000);
  });
};
