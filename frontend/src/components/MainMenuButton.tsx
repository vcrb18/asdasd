// import { useTheme } from "@emotion/react";
// import { createTheme} from "@mui/system";
import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Header from "./Header";
interface ButtonProps {
  label: string;
  href: string;
}

interface MainMenuButtonProps {
  headerButtonLabels: ButtonProps[];
  pageButtonLabels: ButtonProps[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MainMenuButton: React.FC<MainMenuButtonProps> = ({
  pageButtonLabels,
  headerButtonLabels,
}) => {
  return (
    <>
      {/* <Header buttons={headerButtonLabels} /> */}
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        fontSize={"3rem"}
        color="primary.main"
        paddingLeft={"2%"}
        sx={{ width: "-webkit-fill-available" }}
      >
        Menú Principal
      </Box>
      <Grid
        container
        lg={12}
        padding={5}
        spacing={"1%"}
        sx={{
          width: "-webkit-fill-available",
          heigth: "-webkit-fill-available",
        }}
      >
        {pageButtonLabels != null && pageButtonLabels.length > 0
          ? pageButtonLabels.map((button, index) => (
              <Grid item lg={6} xs={12} key={index}>
                <Item>
                  <Box>
                    <Box
                      display={"flex"}
                      justifyContent={"flex-start"}
                      fontSize={"1.26rem"}
                    >
                      {button.label}
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"flex-end"}
                      alignItems={"flex-end"}
                    >
                      <Fab size="small" color="secondary" href={button.href}>
                        <ArrowForwardIcon />
                      </Fab>
                    </Box>
                  </Box>
                </Item>
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default MainMenuButton;
