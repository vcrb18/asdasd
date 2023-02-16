import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header, { ButtonProps } from "./Header";
import "../styles/Login.css";


interface LoginProps {
  buttons: ButtonProps[];
}

const Login: React.FC<LoginProps> = ({ buttons }) => {
  const loginButtonTheme = createTheme({
    palette: {
      primary: {
        main: "#1c9093",
      },
    },
  });
  return (
    <>
    <ThemeProvider theme={loginButtonTheme}>
      <Header buttons={buttons} />
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
            "background-color": "#404040"
          }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            Iniciar Sesión
          </Typography>
          <TextField
            className="login-text"
            required
            color="success"
            margin="normal"
            type={"text"}
            variant="filled"
            placeholder="Usuario"
          />
          <TextField
            required
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Contraseña"
          />
          <Button
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
