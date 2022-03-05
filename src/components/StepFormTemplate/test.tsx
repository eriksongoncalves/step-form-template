import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepFormTemplate from './';

const Step1 = () => <h1>Step 1</h1>;
const Step2 = () => <h1>Step 2</h1>;
const Step3 = () => <h1>Step 3</h1>;
const onFinalStep = jest.fn();

const renderComponent = () => {
  return render(
    <StepFormTemplate
      // eslint-disable-next-line react/jsx-key
      steps={[<Step1 />, <Step2 />, <Step3 />]}
      initialData={{
        firstName: 'Erikson',
        lastName: 'Bezerra',
        address: 'Rua teste'
      }}
      onFinalStep={onFinalStep}
    />
  );
};

describe('StepFormTemplate', () => {
  it('should render with the first step', () => {
    renderComponent();

    const prevButton = screen.getByRole('button', { name: /Voltar/i });
    const nextButton = screen.getByRole('button', { name: /Próximo/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toHaveClass('MuiButton-outlined');
    expect(
      screen.getByRole('heading', { name: /step 1/i })
    ).toBeInTheDocument();
  });

  it('should render with the second step', async () => {
    renderComponent();

    const prevButton = screen.getByRole('button', { name: /Voltar/i });
    const nextButton = screen.getByRole('button', { name: /Próximo/i });

    fireEvent.click(nextButton);

    expect(
      await screen.findByRole('heading', { name: /step 2/i })
    ).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
  });

  it('should changed the next button class when last step', async () => {
    renderComponent();

    const nextButton = screen.getByRole('button', { name: /Próximo/i });

    fireEvent.click(nextButton);

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toHaveClass('MuiButton-contained');
      expect(
        screen.getByRole('heading', { name: /step 3/i })
      ).toBeInTheDocument();
    });
  });
});
