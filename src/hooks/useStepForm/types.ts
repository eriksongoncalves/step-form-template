import { ReactNode } from 'react';

export type StepValues = { [key: string]: string };
export type SetStepValuesData =
  | {
      fieldName: string;
      fieldValue: string;
    }
  | StepValues;

export type StepFormProviderProps = {
  children: ReactNode;
  maxSteps: number;
  initialData?: StepValues;
  onFinalStep(values: StepValues): void;
};

export type StepFormContextValues = {
  currentPage: number;
  isLastStep: boolean;
  stepValues: StepValues;
  nextStep(): void;
  previousStep(): void;
  setValues(values: SetStepValuesData): void;
};
