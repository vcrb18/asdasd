import { useTranslation } from 'react-i18next';

import { Box, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { TimerBoxProps } from '@/utils/AdminViewInterfaces';

import { timeSelect } from '../../utils/AdminViewConst';
import AdminBox from './AdminBox';

function TimerBox({ amountOfTimeActive, onAmountOfTimeActiveChange }: TimerBoxProps) {
  const { t } = useTranslation();

  const handleAmountOfTimeActiveChange = (event: SelectChangeEvent<number>) => {
    onAmountOfTimeActiveChange(event.target.value as number);
  };

  const getTimerSelect = (index: number, value: number) => {
    return (
      <MenuItem key={index} value={value}>
        {value} {value === 1 ? t('minute') : t('minutes')}
      </MenuItem>
    );
  };

  return (
    <Box display={'flex'} width={'100%'} marginY={'1%'}>
      <Grid container display={'flex'}>
        <AdminBox text="activeTime" />
        <Grid item lg={8} md={8} sm={8} xs={12} display={'flex'} justifyContent={'center'}>
          <Select
            value={amountOfTimeActive}
            onChange={handleAmountOfTimeActiveChange}
            sx={{ width: '92%', bgcolor: '#fff' }}
          >
            {timeSelect.map((value, index) => {
              return getTimerSelect(index, value);
            })}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TimerBox;