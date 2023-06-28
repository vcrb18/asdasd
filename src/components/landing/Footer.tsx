import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        top: 'auto',
        bottom: 0,
        marginTop: '0.5%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">Copyright@2022 ISATEC ECG. All rights reserved</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
