import React from "react";
import Avatar from "@mui/material/Avatar";
import LogoImage from "../static/images/Logo_PSINet.jpg";
const Logo: React.FC = () => {
  const avatarStyle = {
    width: "7%",
    height: "auto",
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
