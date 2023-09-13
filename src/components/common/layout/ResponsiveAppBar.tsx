import { useState } from 'react';

import { AppBar, Box } from '@mui/material';

import LogoImage from '@/assets/images/logo_isatec.png';

import Buttons from './NavButtons';

function ResponsiveAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        bgcolor: 'grey.100',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          mx: 4,
          bgcolor: 'grey.100',
        }}
      >
        <img src={LogoImage} height="48px" alt="logo" className="logo" />

        <Buttons openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
