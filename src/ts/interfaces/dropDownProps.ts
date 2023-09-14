import { VariantTypes } from '../types/generalStyleTypes';

export interface IDropdownProps {
  onChange?: (value: number | null) => void;
  value?: number;
  label: string;
  id: string;
  options: Array<number>;
  type: string;
  variant?: VariantTypes;
  size?: 'small' | undefined;
}
