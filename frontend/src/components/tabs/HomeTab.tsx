import { Box, Typography, Divider, Grid, Paper, Avatar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ExtrasistoleImage from "../../static/images/extrasistole.png";
import ArritmiasImage from "../../static/images/arritmia_image.png";
import VerificacionExamenesImage from "../../static/images/verificacion_examenes.png";
import LogoCMM from "../../static/images/logo_cmm.png";
import LogoIsatecCompleto from "../../static/images/logo_isatec_completo.png";
import LogoUChile from "../../static/images/logo_uchile.png";
import LogoUC from "../../static/images/logo_uc.png";

const HomeTab = (): JSX.Element => {
  const { t } = useTranslation();
  const logosCMM = {
    maxWidth: "100%",
    maxHeight: "100%",
    // height: "auto",
  };
  const logosPUC = {
    maxWidth: "100%",
    maxHeight: "100%",
    // height: "auto",
  };
  const logosUChile = {
    maxWidth: "100%",
    maxHeight: "100%",
    // height: "auto",
  };
  const imagesStyle = {
    width: "50%",
    height: "auto",
    padding: "1%",
    margin: "auto",
  };
  return (
    <Box>
      <Typography mt={20} sx={{ fontSize: "4rem", color: "#404040" }}>
        {t("landingTitle")}
      </Typography>
      <Divider variant="fullWidth" />
      <Typography mt={10} sx={{ color: "#404040", fontSize: "1.4rem" }}>
        {t("landingFirstText")}
      </Typography>
      <Typography mt={5} sx={{ color: "#404040", fontSize: "1.4rem" }}>
        {t("landingSecondText")}
      </Typography>
      <Typography
        mt={10}
        sx={{
          textAlign: "left",
          fontSize: "2.5rem",
          color: "#404040",
          fontWeight: "bold",
        }}
      >
        {t("ourProjects")}
      </Typography>
      <Divider variant="fullWidth" />
      <Grid
        container
        lg={12}
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        padding={5}
        sx={{
          marginTop: "1%",
          width: "-webkit-fill-available",
          heigth: "-webkit-fill-available",
        }}
      >
        <Grid item xs={12} lg={6}>
          <Paper sx={{ maxHeight: "100%" }} variant="outlined">
            {t("verificationExams")}
            <Avatar
              src={VerificacionExamenesImage}
              alt="arritmias-image"
              variant="square"
              sx={imagesStyle}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: "100%" }} variant="outlined">
            {t("arrhythmias")}
            <Avatar
              src={ArritmiasImage}
              alt="arritmias-image"
              variant="square"
              sx={imagesStyle}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: "100%" }} variant="outlined">
            {t("extrasystole")}
            <Avatar
              src={ExtrasistoleImage}
              alt="extrasistole-image"
              variant="square"
              sx={imagesStyle}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: "100%" }} variant="outlined">
            {t("diagnostics")}
            <Typography mt={2.5}> {t("firstTextDiagnostics")}</Typography>
            <Typography mt={1}>{t("secondTextDiagnostics")}</Typography>
            <Typography mt={1}>{t("thirdTextDiagnostics")}</Typography>
            <Typography mt={1}>{t("fourthTextDiagnostics")}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        mt={10}
        sx={{
          textAlign: "left",
          fontSize: "2.5rem",
          color: "#404040",
          fontWeight: "bold",
        }}
      >
        {t("team")}
      </Typography>
      <Divider variant="fullWidth" />
      <Typography mt={5} sx={{ color: "#404040", fontSize: "1.4rem" }}>
        {t("firstTextTeam")}
      </Typography>
      <Typography mt={5} sx={{ color: "#404040", fontSize: "1.4rem" }}>
        {t("secondTextTeam")}
      </Typography>
      <Grid
        container
        lg={12}
        rowSpacing={2}
        padding={5}
        sx={{
          marginTop: "2%",
          width: "-webkit-fill-available",
          heigth: "-webkit-fill-available",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6} lg={3}>
          <Box>
            <img
              src={LogoIsatecCompleto}
              alt="isatec image"
              width={"50%"}
              height={"50%"}
            />
          </Box>
          {/* <Avatar
                src={LogoIsatecCompleto}
                alt="isatec image"
                variant="square"
                sx={{logosIsatec}}
              /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ logosCMM }}>
          <Box>
            <img src={LogoCMM} alt="cmm image" width={"40%"} height={"40%"} />
          </Box>
          {/* <Avatar
                src={LogoCMM}
                alt="cmm image"
                variant="square"
              /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ logosUChile }}>
          <Box>
            <img
              src={LogoUChile}
              alt="universidad de chileimage"
              width={"25%"}
              height={"25%"}
            />
          </Box>
          {/* <Avatar
                src={LogoUC}
                alt="universidad catolica image"
                variant="square"
              /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ logosPUC }}>
          <Box>
            <img
              src={LogoUC}
              alt="universidad catolica image"
              width={"25%"}
              height={"25%"}
            />
          </Box>
          {/* <Avatar
                src={LogoUChile}
                alt="universidad de chile image"
                variant="square"
              /> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomeTab;
