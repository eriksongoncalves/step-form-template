import { ReactNode } from 'react';
import { Button, Divider } from '@mui/material';

import { useStepForm } from '../../hooks/useStepForm';

export type StepFormTemplateProps = {
  children?: ReactNode;
  steps: ReactNode[];
};

function StepFormTemplate({ steps }: StepFormTemplateProps) {
  const { currentPage, isLastStep, previousStep, nextStep } = useStepForm();

  return (
    <>
      {steps[currentPage - 1]}

      <Divider />

      <Button
        variant="outlined"
        onClick={previousStep}
        disabled={currentPage <= 1}
      >
        Voltar
      </Button>

      <Button
        variant={isLastStep ? 'contained' : 'outlined'}
        onClick={() => nextStep()}
      >
        Próximo
      </Button>
    </>
  );
}

export default StepFormTemplate;
