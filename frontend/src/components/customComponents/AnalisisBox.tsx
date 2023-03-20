import React from "react";
import { Typography, Select, MenuItem, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PatoGrid from "./PathologiesGrid";
import DiagnosisComponent from "./DiagnosisComponent";

export default function AnalisisBox(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      sx={{ backgroundColor: "#159194", borderRadius: "2%" }}
    >
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
        <Typography fontSize={"80%"} width={"100%"} sx={{ color: "#000000" }}>
          Análisis
        </Typography>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Estado
            </Typography>
          </Grid>
          <Grid item>
            <Select
              size="small"
              sx={{
                marginLeft: "1%",
                backgroundColor: "#006a6b",
                color: "#fff",
                borderRadius: 1,
              }}
            >
              <MenuItem value="estado">{t("state")}</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Urgencia
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"}>
            <Select
              size="small"
              sx={{
                marginLeft: "1%",
                backgroundColor: "#006a6b",
                color: "#fff",
                borderRadius: 1,
              }}
            >
              <MenuItem value="urgencia">{t("state")}</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"1%"}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} marginX={"2%"}>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Patologías
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} marginX={"2%"}>
            <PatoGrid />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
        <DiagnosisComponent />
      </Box>
    </Box>
  );
}
