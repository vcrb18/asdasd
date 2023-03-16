import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import React from "react";
import PredictionBox from "../customComponents/PredictionBox";
import AnalisisBox from "../customComponents/AnalisisBox";
import DerivationsComponent from "../customComponents/DerivationsComponent";
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
      <Box marginY={"6%"} width={"100%"} >
        <Grid container display={'flex'} mt={'1%'} mb={'4%'} >
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Fab size="small" href="/exams">
                <ArrowCircleLeftIcon/>
              </Fab>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography fontSize={'80%'} color={"#404040"}> Folio examen: F-2341 </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <Typography fontSize={'80%'} color={"#404040"}>
              Fecha de recepción: 12/12/2020
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Button variant="contained" sx={{ backgroundColor: "#006a6b", color: "#ffffff" }}>
                Validar mediciones
              </Button>
          </Grid>
        </Grid>

        <Grid container display={'flex'} width={'100%'} rowSpacing={1} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={12} lg={5.5} marginX={'2%'}>
            <AnalisisBox/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5.5} marginX={'2%'}>
            <PredictionBox/>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"center"} marginTop={"5%"}>
            <DerivationsComponent />
        </Box>
      </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default ExamsView;
