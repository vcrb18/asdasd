import React from 'react';
import {  Typography, Select, MenuItem, Box } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PatoGrid from './PathologiesGrid';
import DiagnosisComponent from './DiagnosisComponent';

export default function AnalisisBox(): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
    <Box display={'flex'} flexDirection={'column'}>
      <Box>
        <Typography fontSize={"80%"} width={'100%'} sx={{color: '#000000'}}>
          Análisis
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} margin={'2%'}>
        <Box>
          <Typography fontSize={"80%"} sx={{color: '#000000'}}>Estado</Typography>
        </Box>
        <Box>
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
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} margin={'2%'}>
        <Box>
          <Typography fontSize={"80%"} sx={{color: '#000000'}}>Urgencia</Typography>
        </Box>
        <Box>
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
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} margin={'2%'}>
        <Box >
          <Typography fontSize={"80%"} sx={{color: "#000000"}}>Patologías</Typography>
        </Box>
        <Box marginLeft={'2%'}>
          <PatoGrid/>
        </Box>
      </Box>
      <Box>
        <DiagnosisComponent/>
      </Box>
    </Box>
    </>
  )
};