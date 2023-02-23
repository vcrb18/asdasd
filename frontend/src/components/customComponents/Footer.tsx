import { AppBar, Toolbar, Typography } from "@mui/material";
import PropTypes, { type Validator } from "prop-types";

interface FooterProps {
  footerPosition: "static" | "fixed";
}

const Footer: React.FC<FooterProps> = ({ footerPosition }) => {
  return (
    <AppBar
      position={footerPosition}
      sx={{ top: "auto", bottom: 0, background: "#1c9093" }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography sx={{ fontSize: "1.2rem" }}>
          Copyright@2022 ISATEC Heart. All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  footerPosition: PropTypes.oneOf(["static", "fixed"]) as Validator<
    "fixed" | "static"
  >,
};

export default Footer;
