import { useExam } from '@/hooks/ExamContext';

import { Grid, LinearProgress, Typography } from '@mui/material';

import ExamInformationBox from './examInformationComponent/examInformationBox';
import ExamLayoutButton from './examLayoutButtons';

function ExamViewLayout() {
  const { exam, isLoading } = useExam();
  if (isLoading) return <LinearProgress />;
  else if (exam)
    return (
      <Grid container marginY={'1%'} width={'100%'} display={'flex'} alignItems={'center'}>
        <ExamLayoutButton buttonText={'goBack'} />
        <Grid container display={'flex'} mb={'4%'} item xs={12} sm={12} md={8} lg={8} flexDirection={'column'}>
          <Grid container display={'flex'} justifyContent={'space-around'}>
            <ExamInformationBox />
          </Grid>
        </Grid>
        <ExamLayoutButton buttonText={'validate'} />
      </Grid>
    );

  return <Typography>Error, este examen no existe</Typography>;
}

export default ExamViewLayout;
