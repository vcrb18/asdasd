import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { AdminBoxProps } from '@/utils/AdminViewInterfaces';

function AdminBox({ text }: AdminBoxProps) {
  const { t } = useTranslation();

  return (
    <Grid
      item
      lg={4}
      md={4}
      sm={4}
      xs={6}
      sx={{ backgroundColor: '#007088' }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={4}
      width={'80%'}
    >
      <Typography color={'#ffffff'}>{t(text)}</Typography>
    </Grid>
  );
}

export default AdminBox;
