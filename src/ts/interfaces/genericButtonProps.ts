import { ButtonVariant } from '../types/buttonTypes';

export interface IGenericButtonProps {
  label: string;
  onPress: () => void;
  href?: string;
  full?: boolean;
  variant?: ButtonVariant;
}
