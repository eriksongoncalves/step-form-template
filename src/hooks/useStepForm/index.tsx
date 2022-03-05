import { useContext, createContext, useState } from 'react';
import {
  StepFormContextValues,
  StepFormProviderProps,
  SetStepValuesData
} from './types';

const StepFormContext = createContext<StepFormContextValues>(
  {} as StepFormContextValues
);

function StepFormProvider({
  children,
  maxSteps,
  initialData = {},
  onFinalStep
}: StepFormProviderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [stepValues, setStepValues] = useState(initialData);

  function setValues(values: SetStepValuesData) {
    let value = {};

    if (values.fieldName) {
      value = {
        [values.fieldName]: values.fieldValue
      };
    }

    value = values;

    setStepValues(oldValues => ({
      ...oldValues,
      ...value
    }));
  }

  function nextStep() {
    if (currentPage < maxSteps) {
      const page = currentPage + 1;
      setCurrentPage(page);
      setIsLastStep(page === maxSteps);
    } else {
      onFinalStep(stepValues);
    }
  }

  function previousStep() {
    if (currentPage > 1) {
      setCurrentPage(page => page - 1);
      setIsLastStep(false);
    }
  }

  return (
    <StepFormContext.Provider
      value={{
        currentPage,
        isLastStep,
        nextStep,
        previousStep,
        stepValues,
        setValues
      }}
    >
      {children}
    </StepFormContext.Provider>
  );
}

const useStepForm = () => {
  const context = useContext(StepFormContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error('useStepForm must not be used without an StepFormProvider');
  }

  return context;
};

export { StepFormProvider, useStepForm };
