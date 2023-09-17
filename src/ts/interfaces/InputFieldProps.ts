import { ChangeEvent } from 'react';

export interface IInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  error?: boolean;
  helperText?: string;
  styles?: string;
}
