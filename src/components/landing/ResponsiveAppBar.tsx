import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoImage from '@/assets/images/logo_isatec.png';
import { useAuth } from '@/hooks/AuthContext';

function ResponsiveAppBar() {
  const { user, signOut } = useAuth();
  return (
    <AppBar
      position="sticky"
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

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {user ? (
            <>
              <Typography variant="h5" sx={{ alignSelf: 'center' }} color="primary">
                {user.email}
              </Typography>
              <Button
                key="logout"
                onClick={signOut}
                sx={{
                  mx: 12,
                  display: 'block',
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', my: 2 }}>
              <Button
                key="login"
                href="/login"
                variant="contained"
                sx={{
                  mx: 6,
                }}
              >
                Log in
              </Button>
              <Button key="register" href="/register" variant="contained">
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
