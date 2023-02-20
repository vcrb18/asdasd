import React from "react";
import Avatar from "@mui/material/Avatar";
import LogoImage from "../static/images/logo-isatec.png";

const Logo: React.FC = () => {
  const avatarStyle = {
    width: "7%",
    height: "auto",
    padding: "1%",
  };

  return (
    <Avatar
      src={LogoImage}
      alt="logo-psinet"
      variant="square"
      sx={avatarStyle}
    />
  );
};

export default Logo;
