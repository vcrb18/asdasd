import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import PropTypes, { type Validator } from "prop-types";

interface FooterProps {
  footerPositionMd: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  footerPositionLg: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

const Footer: React.FC<FooterProps> = ({ footerPositionMd, footerPositionLg }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
    {isMatch ? (
      <AppBar
      position={footerPositionMd}
      sx={{ top: "auto", bottom: 0, background: "#007088", height: "auto", marginTop: "2%" }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography sx={{ fontSize: "1.2rem" }} color="#fff" >
          Copyright@2022 ISATEC Heart. All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
    ) : (   
      <AppBar
      position={footerPositionLg}
      sx={{ top: "auto", bottom: 0, background: "#007088", height: "auto" }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography sx={{ fontSize: "1.2rem" }} color="#fff" >
          Copyright@2022 ISATEC Heart. All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
    )}
    </>
    
  );
};


export default Footer;
