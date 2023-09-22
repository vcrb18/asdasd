import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import IdAIApplication from '../components/admin/IdAIApplication';
import MedicalCenters from '../components/admin/MedicalCenters';
import { AdminViewBoxStyle } from '../utils/AdminViewConst';

function AdminView() {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        display={'flex'}
        justifyContent={'center'}
        sx={{ color: '#6fb6c1', fontSize: '4rem', fontWeight: 'bold' }}
      >
        {t('admin.adminTitle')}
      </Typography>

      <Box sx={AdminViewBoxStyle}>
        <MedicalCenters />
      </Box>

      <Box sx={AdminViewBoxStyle}>
        <IdAIApplication />
      </Box>
    </>
  );
}

export default AdminView;
