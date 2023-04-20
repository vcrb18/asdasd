import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography } from "@mui/material";
import Header, { type ButtonProps } from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { useTranslation } from "react-i18next";
import { login } from "../../service/auth.service";
import "../../styles/Login.css";
import LogoCompleto from "../../static/images/logo_isatec_completo.png"
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
export interface LoginProps {
  buttons: ButtonProps[];
}

interface LoginInputs {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ buttons }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true)
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

        setLoading(false);
        const userMessage = "Usuario o contraseña inválidos"
        if (error.response.status == 401){
          setMessage(userMessage);  
        }
        else {
          setMessage(resMessage);
        }
      }
    ).then( () => setLoading(false));
  };
  return (
    <>
    <Box
      width={"100%"}
      height={"100%"}
      >
      {/* <ThemeProvider theme={loginButtonTheme}>   */}
        {/* <Header
          buttons={buttons}
          onTabValueChange={(index: number) => {
            console.log(`Funcion que no hace nada en el Login`);
          }}
        /> */}
        <form onSubmit={handleSubmit}>
          <Grid 
            container
            display={"flex"}
            lg={12} md={12} xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"5%"}
            >
            <Grid 
              container
              lg={4} md={4} xs={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              >
              <Grid item 
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                >
                <img src={LogoCompleto} width={"75%"}/>
              </Grid>

              <Divider />
              
              <Grid item 
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                // display={"flex"}
                // justifyContent={"center"}
                // alignItems={"flex-end"}
                >
                <Typography fontSize={"180%"} color={"#82b8c2"} >
                  {t("access")}
                </Typography>
              </Grid>

            </Grid>
            <Grid 
              container 
              lg={8} md={8} xs={12}
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}              
              >
              <Grid item
                display={"flex"}
                flexDirection="column"
                padding={"5%"}
                borderRadius={3}
                width={"70%"}
                
                // boxShadow={"5px 5px 10px #ccc"}
                // box-shadow={"0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"}
                sx={{
                  // ":hover": {
                  //   boxShadow: "10px 10px 20px #ccc",
                  // },
                  boxShadow:
                    "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                  "background-color": "#E4EDEF",
                }}
              >
                <Grid item
                  borderRadius={3}
                  width={"100%"}
                >
                <Typography
                  fontSize={"120%"}>
                  {t("user")}
                </Typography>
                </Grid>
                <Grid item
                borderRadius={3}
                width={"100%"}
                >
                <TextField
                  fullWidth
                  margin="normal"
                  type={"text"}
                  name="username"
                  sx={{backgroundColor: "#FFF"}}
                  required
                  color="success"
                  variant="outlined"
                  value={loginInputs.username}
                  onChange={handleChange}
                />
                </Grid>
                <Grid item
                  width={"100%"}
                  borderRadius={3}
                >
                  <Typography
                  fontSize={"120%"}>
                  {t("password")}
                </Typography>
                </Grid>
                <Grid item 
                  borderRadius={3}
                  width={"100%"}
                >

                <TextField
                  fullWidth
                  name="password"
                  margin="normal"
                  value={loginInputs.password}
                  onChange={handleChange}
                  type={"password"}
                  required
                  sx={{backgroundColor: "#FFF", width: "100%"}}
                />
                </Grid>
                {loading ? <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></div> : <></>}
                {message ? <Grid item style={{color: "#007088"}}> {message} </Grid> : <></>}
                <Grid item>
                <Button
                  size="large"
                  type="submit"
                  sx={{ color: "#FFF", backgroundColor: "#007088", lightingColor: "#007088", marginTop: "3%", borderRadius: 3 }}
                >
                  {t("login")}
                </Button>
                </Grid>
              </Grid>
              <Grid item mt={"2%"}>
                <Typography fontSize={"90%"}>
                  {t("forgotPassword")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
        
      {/* </ThemeProvider> */}
    </Box>

      {/* <Footer footerPosition={"fixed"} /> */}
    </>
  );
};

export default Login;
