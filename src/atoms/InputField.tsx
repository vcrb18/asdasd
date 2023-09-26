import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import { getStyle } from '@/utils/styleAuxFunctions';

import { IInputFieldProps } from '@/ts/interfaces/InputFieldProps';

export default function InputField(props: IInputFieldProps) {
  const { t } = useTranslation();
  const { styles, label, helperText, ...rest } = props;
  const params = getStyle(styles);
  return <TextField label={t(label)} helperText={t(helperText ? helperText : '')} {...rest} {...params} />;
}
