import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useStepForm, StepFormProvider } from '.';

const mockOnFinalStep = jest.fn();

const defaultHookProps = {
  wrapper: StepFormProvider,
  initialProps: {
    maxSteps: 3,
    children: <></>,
    onFinalStep: mockOnFinalStep
  }
};

describe('useStepForm', () => {
  it('should throw an error when was without a Provider', async () => {
    const { result } = renderHook(() => useStepForm());

    waitFor(() => {
      expect(result).toThrow(
        'useStepForm must not be used without an StepFormProvider'
      );
    });
  });

  it('should render with default values', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    waitFor(() => {
      expect(result.current.currentPage).toBe(1);
      expect(result.current.isLastStep).toBe(false);
    });
  });

  it('should jump to previous step', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.nextStep();
    result.current.previousStep();

    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
      expect(result.current.isLastStep).toBe(false);
    });
  });

  it('should jump to next step', () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.nextStep();

    waitFor(() => {
      expect(result.current.currentPage).toBe(2);
      expect(result.current.isLastStep).toBe(false);
    });
  });

  it('should stop in the fist page', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.previousStep();

    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
      expect(result.current.isLastStep).toBe(false);
    });
  });

  it('should stop in the last page', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.nextStep();
    result.current.nextStep();
    result.current.nextStep();

    await waitFor(() => {
      expect(result.current.currentPage).toBe(3);
      expect(result.current.isLastStep).toBe(true);
      expect(mockOnFinalStep).toBeCalled();
    });
  });

  it('should set the values by fieldName', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.setValues({
      fieldName: 'Name'
    });

    await waitFor(() => {
      expect(result.current.stepValues).toMatchObject({
        fieldName: 'Name'
      });
    });
  });

  it('should set the values by object', async () => {
    const { result } = renderHook(() => useStepForm(), defaultHookProps);

    result.current.setValues({
      lastName: 'Last Name'
    });

    await waitFor(() => {
      expect(result.current.stepValues).toMatchObject({
        lastName: 'Last Name'
      });
    });
  });

  it('should render with initial data', async () => {
    const hookPropsWithInitialData = {
      ...defaultHookProps,
      initialProps: {
        ...defaultHookProps.initialProps,
        initialData: {
          name: 'My name'
        }
      }
    };

    const { result } = renderHook(
      () => useStepForm(),
      hookPropsWithInitialData
    );

    await waitFor(() => {
      expect(result.current.stepValues).toMatchObject({
        name: 'My name'
      });
    });
  });
});
