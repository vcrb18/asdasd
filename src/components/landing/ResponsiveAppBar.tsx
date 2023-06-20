import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
  MenuItem, 
  Select, 
  SelectChangeEvent, 
  Typography} from '@mui/material';

import MenuIcon from "@mui/icons-material/Menu";
import LogoImage from '@/assets/images/logo_isatec.png';
import { useTranslation } from 'react-i18next';

function DrawerButton({
  key,
  onClick,
  href,
  label
}: {
  key: string;
  onClick: (() => void) | undefined;
  href: string;
  label: string;
}) {
  return(
    <ListItemButton
    key={key}
    onClick={onClick}
    href={href}
  >
    <ListItemIcon>
      <ListItemText> {label} </ListItemText>
    </ListItemIcon>
  </ListItemButton>
  );
}

function DrawerButtons() {
  const { i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const [language, setLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = useCallback((event: SelectChangeEvent): void => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error(error);
    });
  }, [i18n]);
  return (
  <>
    <Select
      value={language}
      onChange={handleLanguageChange}
      size="small"
      sx={{
        width: "154px",
        color: "#00000089",
      }}
    >
      <MenuItem value="es"> Spanish </MenuItem>
      <MenuItem value="en"> English </MenuItem>
    </Select>
    {user ? (
    <List>
      <DrawerButton key="logout"  onClick={signOut} href={""} label="Log out"/>
    </List> 
    ) : (
    <List>
      <DrawerButton key="login" onClick={undefined} href={"/login"} label="Log in"/>
      <DrawerButton key="register" onClick={undefined} href={"/register"} label="Register"/>
  </List> 
  )}
  </>
  );
}

function Buttons({
  setOpenDrawer, 
  openDrawer
}: { 
  setOpenDrawer: Dispatch<SetStateAction<boolean>>; 
  openDrawer: boolean; 
}) {
  const { i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const [language, setLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = useCallback((event: SelectChangeEvent): void => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error(error);
    });
  }, [i18n]);
  return(
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    {user ? (
      <Box sx={{ display: 'flex', flexDirection: 'row', my: 2 }}>
        <Typography variant="h5" sx={{ alignSelf: 'center' }} color="primary">
          {user.email}
        </Typography>
        <Button
          key="logout"
          variant="contained"
          onClick={signOut}
          sx={{
            mx: 8,
            display:{ xs: "none", sm: "block"}
          }}
        >
          Log out
        </Button>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', flexDirection: 'row', my: 2 }}>
        <Button
          key="login"
          href="/login"
          variant="contained"
          sx={{
            mx: 4,
            display:{ xs: "none", sm: "flex"}
          }}
        >
          Log in
        </Button>
        <Button 
          key="register" 
          href="/register" 
          variant="contained" 
          sx={{
            mx: 4,
            display:{ 
              xs: "none", 
              sm: "flex"
        }}}>
          Register
        </Button>
      </Box>
    )}
    <Select
      value={language}
      onChange={handleLanguageChange}
      sx={{
        mx: 4,
        marginTop: "17px",
        height: "36.5px",
        backgroundColor: "#007088",
        color: "#fff",
        display:{ xs: "none", sm: "flex"}
      }}
    >
      <MenuItem value="es"> Spanish </MenuItem>
      <MenuItem value="en"> English </MenuItem>
    </Select>
    <IconButton
      sx={{ color: "#e0e0e0", marginLeft: "auto", display:{ xs: "flex", sm: "none"}}}
      onClick={() => {
        setOpenDrawer(!openDrawer);
      }}
    >
      <MenuIcon sx={{ marginLeft: "auto", color: '#000'}} />
    </IconButton>
  </Box>
  );
}

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
      <Drawer
        disableScrollLock={true}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        sx={{display:{ xs: "flex", sm: "none"}}}
        >
          <DrawerButtons/>
      </Drawer>
    </AppBar>
  );
}
export default ResponsiveAppBar;