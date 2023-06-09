import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        top: 'auto',
        bottom: 0,
        border: '1px solid #E0E0E0',
        borderLeft: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h5">Copyright@2022 ISATEC ECG. All rights reserved</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
