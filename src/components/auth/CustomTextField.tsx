import { TextField } from '@mui/material';

import { TextFieldParams } from '@/ts/interfaces/textFieldProps';

function CustomTextField(params: TextFieldParams): JSX.Element {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={params.id}
      label={params.label}
      name={params.name}
      type={params.type}
      autoComplete={params.autoComplete}
      autoFocus={params.autoFocus}
      value={params.value}
      onChange={params.onChange}
      error={params.error}
    />
  );
}

export { CustomTextField };
