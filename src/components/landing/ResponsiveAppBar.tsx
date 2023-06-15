import { useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';

import { 
  AppBar, 
  Box, 
  Button, 
  Drawer, 
  IconButton,
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography, 
  useMediaQuery, 
  useTheme } from '@mui/material';

import MenuIcon from "@mui/icons-material/Menu";
import LogoImage from '@/assets/images/logo_isatec.png';

function ResponsiveAppBar() {
  const { user, signOut } = useAuth();
  
  const theme = useTheme();
  const isMatchMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatchXs = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);

  if (!isMatchXs && !isMatchMd){
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
  } else {
    return (
      <AppBar
        position="sticky"
        sx={{ background: "#fff", height: "auto", width: "100%", top: "0" }}
      >
        <Toolbar>
          <IconButton
            sx={{ color: "#e0e0e0", marginLeft: "auto" }}
            onClick={() => {
              setOpenDrawer(!openDrawer);
            }}
          >
            <MenuIcon sx={{ marginLeft: "auto", color: '#000'}} />
          </IconButton>
          <Drawer
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(false);
            }}
          >
            <List>
                <ListItemButton
                  key="login"
                  href="/login"
                >
                  <ListItemIcon>
                    <ListItemText>Log in</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  key="register" 
                  href="/register"
                >
                  <ListItemIcon>
                    <ListItemText>Register</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
          </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    );
  }
  }
export default ResponsiveAppBar;