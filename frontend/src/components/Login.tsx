import React, { useState, ChangeEvent, FormEvent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header, { ButtonProps, TabProps } from "./Header";
import "../styles/Login.css";

interface LoginProps {
  buttons: ButtonProps[];
}

interface LoginInputs {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ buttons }) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginInputs);
  };
  return (
    <>
      <ThemeProvider theme={loginButtonTheme}>
        <Header buttons={buttons} />
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
              Iniciar Sesión
            </Typography>
            <TextField
            margin="normal"
            type={"text"}
              name="login-text"
              required
              color="success"
              margin="normal"
              type={"text"}
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
            >
              Iniciar Sesión
            </Button>
          </Box>
        </form>
      </ThemeProvider>
    </>
  );
};

export default Login;
