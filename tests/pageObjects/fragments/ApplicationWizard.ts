import { Locator, Page } from "@playwright/test";

import { ApplicationDataStep } from "../components/ApplicationDataStep";
import { ApplicationTemplateStep } from "../components/ApplicationTemplateStep";
import { ApplicationTypeStep } from "../components/ApplicationTypeStep";
import { Wizard } from "../components/Wizard";
import BaseFragment from "./BaseFragment";

export class ApplicationWizard extends BaseFragment {
  wizard: Wizard;
  applicationTypeStep: ApplicationTypeStep;
  applicationTemplateStep: ApplicationTemplateStep;
  applicationDataStep: ApplicationDataStep;

  constructor(page: Page) {
    super(page);
    this.wizard = new Wizard(page);
    this.applicationTypeStep = new ApplicationTypeStep(page);
    this.applicationTemplateStep = new ApplicationTemplateStep(page);
    this.applicationDataStep = new ApplicationDataStep(page);
  }

  get(): Locator {
    return this.wizard.get();
  }

  getCurrentStepTitle(): Locator {
    return this.wizard.getCurrentStep();
  }

  selectType(applicationType: string) {
    this.applicationTypeStep.select(applicationType);
  }

  selectTemplate(applicationTemplate: string) {
    this.applicationTemplateStep.select(applicationTemplate);
  }

  async fillName(name: string) {
    await this.applicationDataStep.fillName(name);
  }

  async fillDescription(description: string) {
    await this.applicationDataStep.fillDescription(description);
  }
}
