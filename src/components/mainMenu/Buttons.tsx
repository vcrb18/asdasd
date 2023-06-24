import { useCallback } from 'react';

import { Avatar, Button, Grid, Typography } from '@mui/material';

import { mainMenuPageButtons } from '@/utils/MenuButtons';

import { MenuButton } from '@/ts/interfaces/menuButton';

function MainMenuButton({ label, href, image }: MenuButton) {
  const buttonIsNotExam = label === 'alerts' || label === 'metrics' || label === 'report';

  return (
    <Grid container lg={6} md={6} xs={12} key={label} padding={'0.5%'}>
      <Button sx={{ backgroundColor: '#E4EDEF' }} href={href} fullWidth disableElevation disabled={buttonIsNotExam}>
        <Grid
          container
          display={'flex'}
          justifyContent={'center'}
          alignItems={'space-arround'}
          sx={{
            width: '-webkit-fill-available',
            heigth: '-webkit-fill-available',
          }}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={'2%'}
            width={'100%'}
            height={'100%'}
          >
            <Avatar src={image} alt={label} sizes={'large'} sx={{ marginBottom: '2%' }} />
            <Typography fontSize={'250%'} color={'#007088'}>
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Grid>
  );
}

function MainMenuButtons() {
  const drawMainMenuButton = useCallback((button: MenuButton) => {
    return <MainMenuButton label={button.label} href={button.href} image={button.image} />;
  }, []);

  return (
    <Grid
      container
      lg={12}
      paddingX={'2%'}
      spacing={'1%'}
      sx={{
        width: '-webkit-fill-available',
        heigth: '-webkit-fill-available',
      }}
    >
      {mainMenuPageButtons.map((button) => drawMainMenuButton(button))}
    </Grid>
  );
}

export default MainMenuButtons;
