import { Step1, Step2, Step3 } from './steps';
import StepFormTemplate from '../StepFormTemplate';

type RegisterFormData = {
  firstName: string;
  lastName: string;
  address: string;
};

function RegisterForm() {
  function handleFinalStep(values: RegisterFormData) {
    // eslint-disable-next-line no-console
    console.log('SEUS DADOS >>> ', values);
  }

  return (
    <StepFormTemplate
      // eslint-disable-next-line react/jsx-key
      steps={[<Step1 />, <Step2 />, <Step3 />]}
      initialData={{
        firstName: 'Erikson',
        lastName: 'Bezerra',
        address: 'Rua teste'
      }}
      onFinalStep={handleFinalStep}
    />
  );
}

export default RegisterForm;
