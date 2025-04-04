import { HTMLProps, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type WizardStep = PropsWithChildren<{
  label: string;
  isCurrent: boolean;
  isDone: boolean;
  isFinal: boolean;
  render: () => React.ReactNode;
}>;

type WizardProps = PropsWithChildren<{
  steps: WizardStep[];
}> &
  HTMLProps<HTMLDivElement>;

const makeStyles = tv({
  slots: {
    root: "",
    nav: "mb-4",
    stepList: "flex justify-between",
    step: "",
  },
  variants: {
    isCurrent: {
      true: {
        step: "font-bold",
      },
    },
    isDone: {
      true: {
        step: "text-green-500",
      },
    },
  },
  compoundVariants: [
    {
      isCurrent: false,
      isDone: false,
      class: {
        step: "text-gray-400",
      },
    },
  ],
});

export const Wizard = ({ steps, ...props }: WizardProps) => {
  const styles = makeStyles();
  const currentStep = steps.find((step) => step.isCurrent);

  if (!currentStep) {
    throw new Error("No current step found");
  }

  return (
    <div className={styles.root()} {...props}>
      {/* Step indicator */}
      <nav className={styles.nav()} aria-label="Wizard progress">
        <ol className={styles.stepList()} role="list">
          {steps.map((step) => (
            <li
              className={styles.step({
                isCurrent: step.isCurrent,
                isDone: step.isDone,
              })}
              key={step.label}
            >
              <span aria-current={step.isCurrent ? "step" : undefined}>{step.label}</span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <div>{currentStep?.render()}</div>
    </div>
  );
};
