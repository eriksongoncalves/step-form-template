import { ReactNode } from 'react';

import { StepFormProvider } from '../../hooks/useStepForm';
import { StepValues } from '../../hooks/useStepForm/types';
import StepFormTemplate from './TemplateContent';

export type StepFormTemplateWithProviderProps = {
  children?: ReactNode;
  steps: ReactNode[];
  initialData?: StepValues;
  onFinalStep(values: StepValues): void;
};

function StepFormTemplateWrapper({
  children,
  steps,
  initialData,
  onFinalStep
}: StepFormTemplateWithProviderProps) {
  return (
    <StepFormProvider
      maxSteps={steps.length}
      initialData={initialData}
      onFinalStep={onFinalStep}
    >
      <StepFormTemplate steps={steps}>{children}</StepFormTemplate>
    </StepFormProvider>
  );
}

export default StepFormTemplateWrapper;
