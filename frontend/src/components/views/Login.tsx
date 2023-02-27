import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header, { type ButtonProps } from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { useTranslation } from "react-i18next";
// import bcrypt from 'bcrypt';
import "../../styles/Login.css";

interface LoginProps {
  buttons: ButtonProps[];
}

interface LoginInputs {
  username: string;
  password: string;
}

// const bcryptHashComplexity = 10;

const Login: React.FC<LoginProps> = ({ buttons }) => {
  const { t } = useTranslation();
  const loginButtonTheme = createTheme({
    palette: {
      primary: {
        main: "#404040",
      },
    },
  });
  const [loginInputs, setLoginInputs] = useState<LoginInputs>({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // const hashedPassword = bcrypt.hash(
    // loginInputs.password,
    // bcryptHashComplexity,
    // (error: any, hash: string) => {
    // if (error) {
    // console.log("Error encriptando");
    // } else {
    // console.log(`Se hasheo la contrasena y es ${hash}`);
    // }
    // }
    // );
    console.log(loginInputs);
  };
  return (
    <>
      <ThemeProvider theme={loginButtonTheme}>
        <Header
          buttons={buttons}
          onTabValueChange={(index: number) => {
            console.log(`Funcion que no hace nada en el Login`);
          }}
        />
        <form onSubmit={handleSubmit}>
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
              "background-color": "#FFFFFF",
            }}
          >
            <Typography
              variant="h2"
              padding={3}
              textAlign={"center"}
              color="primary"
            >
              {t("login")}
            </Typography>
            <TextField
              margin="normal"
              type={"text"}
              name="login-text"
              required
              color="success"
              variant="outlined"
              placeholder="Usuario"
            />
            <TextField
              name="password"
              value={loginInputs.password}
              onChange={handleChange}
              margin="normal"
              type={"password"}
              required
              variant="outlined"
              placeholder="Contraseña"
            />
            <Button
              type="submit"
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="primary"
              href="/mainmenu"
            >
              {t("login")}
            </Button>
          </Box>
        </form>
      </ThemeProvider>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default Login;
