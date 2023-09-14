import { ChangeEvent } from 'react';

interface TextFieldParams {
  margin?: string;
  required?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  type?: string;
  name: string;
  autoComplete: string;
  autoFocus?: boolean;
  value: string;
  onChange: (event: ChangeEvent) => void;
  error?: boolean;
  helperText?: any;
}

export type { TextFieldParams };
