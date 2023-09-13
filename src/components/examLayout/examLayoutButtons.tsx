import { Button, Grid, ThemeProvider, Typography } from '@mui/material';

import { ExamViewButtonsProps } from '@/ts/interfaces/exam';

import buttonsTheme from './examLayoutButtons.style';

function ExamLayoutButton({ buttonText }: ExamViewButtonsProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Grid item xs={6} sm={6} md={2} lg={2} marginBottom={'1%'}>
      <ThemeProvider theme={buttonsTheme}>
        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            backgroundColor: '#007088',
            color: '#fff',
            width: '80%',
          }}
        >
          <Typography color="#ffffff" fontWeight={'bold'}>
            {buttonText}
          </Typography>
        </Button>
      </ThemeProvider>
    </Grid>
  );
}

export default ExamLayoutButton;
