import { TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useStepForm } from '../../../hooks/useStepForm';

type Step1FormData = {
  firstName: string;
  lastName: string;
};

function Step1() {
  const { setValues, stepValues } = useStepForm();
  const { control, watch } = useForm<Step1FormData>({
    defaultValues: {
      ...stepValues
    }
  });

  function handleInputBlur() {
    setValues(watch());
  }

  return (
    <>
      <Typography variant="h6">Step 1</Typography>;
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
            onBlur={handleInputBlur}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
            onBlur={handleInputBlur}
          />
        )}
      />
    </>
  );
}

export default Step1;
