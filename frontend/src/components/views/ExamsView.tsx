import { Box, Button, Fab, Typography } from "@mui/material";
import React from "react";
import PredictionBox from "../customComponents/PredictionBox";
import AnalisisBox from "../customComponents/AnalisisBox";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

interface ExamsViewProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const ExamsView: React.FC<ExamsViewProps> = ({
  buttons,
  tabs,
}): JSX.Element => {
  return (
    <>
      <Header
        tabs={tabs}
        buttons={buttons}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
        }}
      />
      <Box mt={"3%"} mb={"4%"} width={"100%"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            width={"80%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Fab size="small">
              <ArrowCircleLeftIcon />
            </Fab>
            <Typography color={"#404040"}>Folio examen: F-2341 </Typography>
            <Typography color={"#404040"}>
              Fecha de recepción: 12/12/2020
            </Typography>
            <Button sx={{ backgroundColor: "#159194", color: "#000000" }}>
              Validar mediciones
            </Button>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"center"} marginTop={"5%"}>
          
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
            >
              <Box display={"flex"} flexDirection={"column"} width={"45%"}>
                <AnalisisBox />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"45%"}
                sx={{ backgroundColor: "#D4E6DA" }}
                borderRadius={4}
              >
                <PredictionBox />
              </Box>
            </Box>
        </Box>
      </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default ExamsView;
