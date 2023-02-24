import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography, Divider, Grid, Paper, Avatar } from "@mui/material";
import ExtrasistoleImage from "../../static/images/extrasistole.png";
import ArritmiasImage from "../../static/images/arritmia_image.png";
import VerificacionExamenesImage from "../../static/images/verificacion_examenes.png";
import LogoCMM from "../../static/images/logo_cmm.png";
import LogoIsatecCompleto from "../../static/images/logo_isatec_completo.png";
import LogoUChhile from "../../static/images/logo_uchile.png";
import LogoUC from "../../static/images/logo_uc.png";
import { useTranslation } from "react-i18next";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  const { t } = useTranslation();
  const logosStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "auto",
  };
  const imagesStyle = {
    width: "50%",
    height: "auto",
    padding: "1%",
    margin: "auto",
  };
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOnTabValueChange = (index: number): void => {
    setTabIndex(index);
  };

  return (
    <>
      <Header
        buttons={buttons}
        tabs={tabs}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
          handleOnTabValueChange(index);
        }}
      />

      <Box sx={{ padding: 2, maxWidth: "60%" }}>
        {tabIndex === 0 && (
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
              columnSpacing={{ xs: 1, md: 2, lg: 3 }}
              padding={5}
              sx={{
                marginTop: "2%",
                width: "-webkit-fill-available",
                heigth: "-webkit-fill-available",
                backgroundColor: "#FFFFFF",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={6} lg={3}>
                <Avatar
                  src={LogoIsatecCompleto}
                  alt="isatec image"
                  variant="square"
                  sx={logosStyle}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Avatar
                  src={LogoCMM}
                  alt="cmm image"
                  variant="square"
                  sx={logosStyle}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Avatar
                  src={LogoUC}
                  alt="universidad catolica image"
                  variant="square"
                  sx={logosStyle}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Avatar
                  src={LogoUChhile}
                  alt="universidad de chile image"
                  variant="square"
                  sx={logosStyle}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography mt={20} sx={{ fontSize: "4rem", color: "#404040" }}>
              SOBRE NOSOTROS
            </Typography>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography mt={20} sx={{ fontSize: "4rem", color: "#404040" }}>
              CONTACTANOS
            </Typography>
          </Box>
        )}
      </Box>
      <Footer footerPosition={"static"} />
    </>
  );
};

export default LandingPage;
