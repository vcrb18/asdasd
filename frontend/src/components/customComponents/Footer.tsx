import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import PropTypes, { type Validator } from "prop-types";

interface FooterProps {
  footerPositionXs: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  footerPositionMd: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  footerPositionLg: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

const Footer: React.FC<FooterProps> = ({ footerPositionMd, footerPositionLg, footerPositionXs }) : JSX.Element => {
  const theme = useTheme();
  const isMatchMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatchXs = useMediaQuery(theme.breakpoints.down("md"));
  if (!isMatchXs && !isMatchMd){
    return (
      <AppBar
      position={footerPositionLg}
      sx={{ top: "auto", bottom: 0, background: "#007088", height: "auto", marginTop: "2%" }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography sx={{ fontSize: "1.2rem" }} color="#fff" >
          Copyright@2022 ISATEC Heart. All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
    )
    }
  else if (isMatchMd && !isMatchXs)
  {
    return(
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
    )
  }
  else {
    return (
    <AppBar
    position={footerPositionXs}
    sx={{ top: "auto", bottom: 0, background: "#007088", height: "auto", marginTop: "2%" }}
  >
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography sx={{ fontSize: "1.2rem" }} color="#fff" >
        Copyright@2022 ISATEC Heart. All rights reserved
      </Typography>
    </Toolbar>
  </AppBar>
    )
  }
    
};


export default Footer;
