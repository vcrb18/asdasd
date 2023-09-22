import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { removeClientToken, setClientToken } from '@/api/client';
import GenericButton from '@/atoms/Button';
import { useAuth } from '@/hooks/AuthContext';

import { Grid, TextField } from '@mui/material';

import { postExamIdAI } from '../../api/users.service';
import AdminBox from './AdminBox';

function IdAIApplication() {
  const { store } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const [examId, setExamId] = React.useState<string>('');

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamId(event.target.value);
  };

  const handleIdSubmit = async () => {
    try {
      setClientToken(store);
      await postExamIdAI(examId);
      removeClientToken();
      navigate(`/examsview/${examId}`);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <Grid>
      <Grid container display={'flex'} justifyContent={'space-around'}>
        <AdminBox text="examId" />
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={4}
          width={'80%'}
        >
          <TextField
            id="folio-search"
            variant="outlined"
            size="medium"
            onChange={handleIdChange}
            sx={{ width: '90%', bgcolor: '#ffffff' }}
          />
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={2}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={4}
          width={'80%'}
        >
          <GenericButton label={t('admin.apply')} onPress={handleIdSubmit} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default IdAIApplication;
