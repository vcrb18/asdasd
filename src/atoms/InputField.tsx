import { TextField } from '@mui/material';

import { getStyle } from '@/utils/styleAuxFunctions';

import { IInputFieldProps } from '@/ts/interfaces/InputFieldProps';

export default function InputField(props: IInputFieldProps) {
  const { styles } = props;
  const params = getStyle(styles);
  return <TextField {...props} {...params} />;
}
