import { TypeOptions, VariantTypes } from '@/ts/types/generalStyleTypes';

export interface IStyleProps {
  type?: TypeOptions;
  allowEmpty?: boolean;
  variant?: VariantTypes;
  size?: 'small';
  error?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export interface IGetHelperTextProps {
  type?: TypeOptions;
  allowEmpty?: boolean;
  error?: boolean;
}
