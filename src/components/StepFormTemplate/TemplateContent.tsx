import { ReactNode } from 'react';
import { Button, Divider, Paper } from '@mui/material';

import { useStepForm } from '../../hooks/useStepForm';

export type StepFormTemplateProps = {
  children?: ReactNode;
  steps: ReactNode[];
};

function StepFormTemplate({ steps }: StepFormTemplateProps) {
  const { currentPage, isLastStep, previousStep, nextStep } = useStepForm();

  return (
    <>
      <Paper>
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
      </Paper>
    </>
  );
}

export default StepFormTemplate;
