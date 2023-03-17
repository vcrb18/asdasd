import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header, { type ButtonProps } from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { useTranslation } from "react-i18next";
import { login } from "../../service/auth.service";
import "../../styles/Login.css";
import { type NavigateFunction, useNavigate } from "react-router-dom";
export interface LoginProps {
  buttons: ButtonProps[];
}

interface LoginInputs {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ buttons }) => {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  // const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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
    console.log(`loginInputs.username: ${loginInputs.username}`);
    console.log(`loginInputs.password: ${loginInputs.password}`);
    login(loginInputs.username, loginInputs.password).then(
      () => {
        console.log("Entramos al login");
        navigate("/mainmenu");
        window.location.reload();
      },
      (error) => {
        console.log("Entramos al error");
        console.log(error.response.data);

        const resMessage =
          error?.response?.data?.message || error.message || error.toString();

        // setLoading(false);
        setMessage(resMessage);
        console.log(message);
      }
    );
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
              name="username"
              required
              color="success"
              variant="outlined"
              placeholder="Usuario"
              value={loginInputs.username}
              onChange={handleChange}
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
              // href="/mainmenu"
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
