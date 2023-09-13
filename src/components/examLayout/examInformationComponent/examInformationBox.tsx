import { Grid } from '@mui/material';

function ExamInformationBox() {
  return (
    <Grid
      container
      xs={12}
      sm={12}
      md={5}
      lg={5}
      padding={'2%'}
      sx={{
        border: 4,
        borderColor: '#E4EDEF',
        borderRadius: '1%',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 8px 16px rgba(0,0,0,0.3)',
        },
      }}
    ></Grid>
  );
}

export default ExamInformationBox;
