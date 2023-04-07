import React from "react";
import Avatar from "@mui/material/Avatar";
import LogoImage from "../../static/images/logo-isatec.png";
import LogoIsatecHeart from "../../static/images/isatec-heart.png";

const Logo: React.FC = () => {
  const avatarStyle = {
    // maxWidth: "100%",
    // maxHeight: "100%",
    // padding: "1%",
    width: "auto",
    maxHeight: "100%",
    padding: "1%",

    // Add the following code for responsiveness
    // '@media (max-width: 600px)': {
    //   width: "150px",
    //   height: "50px",
    // },
  };

  return (
    <Avatar
      src={LogoIsatecHeart}
      alt="logo-psinet"
      variant="square"
      sx={avatarStyle}
    />
  );
};

export default Logo;
