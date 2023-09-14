import MainMenuButtons from '@/components/mainMenu/Buttons';
import MainMenuLogo from '@/components/mainMenu/Logo';

import { Grid } from '@mui/material';

function MainMenu() {
  return (
    <>
      <Grid
        container
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        sx={{
          width: '-webkit-fill-available',
          height: '-webkit-fill-available',
        }}
        margin={'auto'}
        minHeight={'85vh'}
        lg={12}
        md={12}
        xs={12}
      >
        <MainMenuLogo />
        <Grid container lg={8} md={8} xs={12}>
          <MainMenuButtons />
        </Grid>
      </Grid>
    </>
  );
}

export default MainMenu;