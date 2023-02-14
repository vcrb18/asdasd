import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "./Header";
import { LandingPageProps } from "./LandingPage";

const Login: React.FC<LandingPageProps> = ({ tabs, buttons }) => {
  return (
    <>
      <Header tabs={tabs} buttons={buttons} />
      <form>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={"85%"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={"5%"}
          padding={"5%"}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography>Login</Typography>
          <TextField />
          <TextField />
          <TextField />
          <Button>Login</Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
