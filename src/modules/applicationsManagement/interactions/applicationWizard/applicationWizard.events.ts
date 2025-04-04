export type ApplicationWizardEvents =
  | {
      type: "SET_APPLICATION_TYPE";
      value: string;
    }
  | {
      type: "SET_TEMPLATE_NAME";
      value: string;
    }
  | {
      type: "SET_APPLICATION_DATA";
      name: string;
      description: string;
    };
