import { useTranslation } from 'react-i18next';

import { Autocomplete, TextField } from '@mui/material';

import { IDropdownProps } from '@/ts/interfaces/dropDownProps';

export default function Dropdown(props: IDropdownProps) {
  const { value, type, label } = props;
  const { t } = useTranslation('translation', { keyPrefix: `dropdownInfo.${type}s` });

  return (
    <Autocomplete
      {...props}
      disablePortal
      clearOnEscape
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => t(type.concat(option.toString()))}
      value={value || null}
      onChange={(_, value) => {
        console.log(value);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
