import { TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useStepForm } from '../../../hooks/useStepForm';

type Step2FormData = {
  address: string;
};

function Step2() {
  const { setValues, stepValues } = useStepForm();
  const { control, watch } = useForm<Step2FormData>({
    defaultValues: {
      ...stepValues
    }
  });

  function handleInputBlur() {
    setValues(watch());
  }

  return (
    <>
      <Typography variant="h6">Step 2</Typography>
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
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

export default Step2;
