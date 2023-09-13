import { useTranslation } from 'react-i18next';

import { useExam } from '@/hooks/ExamContext';

import { Grid, LinearProgress, Typography } from '@mui/material';

import GenericButton from '@/atoms/Button';
import ExamInformationBox from './examInformationComponent/examInformationBox';

function ExamViewLayout() {
  const { exam, isLoading } = useExam();
  const { t } = useTranslation();

  const handleGoBack = () => {
    window.history.back();
  };

  if (isLoading) return <LinearProgress />;
  else if (exam)
    return (
      <Grid container marginY={'1%'} width={'100%'} display={'flex'} alignItems={'center'}>
        <Grid item xs={6} sm={6} md={2} lg={2} marginBottom={'1%'}>
          <GenericButton
            label={t('goBack')}
            onPress={handleGoBack}
          />
        </Grid>
        <Grid container display={'flex'} mb={'4%'} item xs={12} sm={12} md={8} lg={8} flexDirection={'column'}>
          <Grid container display={'flex'} justifyContent={'space-around'}>
            <ExamInformationBox />
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2} marginBottom={'1%'}>
          <GenericButton
              label={t('goBack')}
              onPress={handleGoBack}
            />
        </Grid>
      </Grid>
    );

  return <Typography>Error, este examen no existe</Typography>;
}

export default ExamViewLayout;
