type CreateApplicationParams = {
  type: string;
  template: string;
  name: string;
  description: string;
};

export const createApplication = async (
  application: CreateApplicationParams,
): Promise<{ id: string }> => {
  console.log("createApplication", application);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substring(2, 15),
      });
    }, 1000);
  });
};
