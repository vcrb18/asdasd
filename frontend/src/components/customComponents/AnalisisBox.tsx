import React from 'react';
import {  Typography, Grid, Select, MenuItem, Box } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PatoGrid from './PathologiesGrid';

export default function AnalisisBox(): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
    <Box>
      <Typography fontSize={"200%"} sx={{color: '#000000'}}>
        Análisis
      </Typography>
    </Box>
    <Grid 
    container
    rowSpacing={2}
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    padding={5}
    >
      <Grid item lg={3} md={2} xs={12} sx={{backgroundColor: "#fffff"}}>
        <Typography fontSize={"90%"} sx={{color: '#000000'}}>Estado</Typography>
      </Grid>
      <Grid item lg={9} md={10} xs={12}>
        <Select
          size="small"
          sx={{
            marginLeft: "1%",
            backgroundColor: "#006a6b",
            color: "#fff",
            borderRadius: 1
          }}
          >
            <MenuItem value="estado">{t("state")}</MenuItem>
        </Select>
      </Grid>
      <Grid item lg={3} md={2} xs={12}>
        <Typography fontSize={"90%"} sx={{color: '#000000'}}>Urgencia</Typography>
      </Grid>
      <Grid item lg={9} md={10} xs={12}>
        <Select
          size="small"
          sx={{
            marginLeft: "1%",
            backgroundColor: "#006a6b",
            color: "#fff",
            borderRadius: 1
          }}
          >
          <MenuItem value="urgencia">{t("urgency")}</MenuItem>
        </Select>
      </Grid>
      <Grid item lg={3} md={2} xs={12}>
        <Typography fontSize={"90%"} sx={{color: "#000000"}}>Patologías</Typography>
      </Grid>
      <Grid item lg={9} md={10} xs={12}>
        <PatoGrid/>
      </Grid>        
    </Grid>
    </>
  )
};