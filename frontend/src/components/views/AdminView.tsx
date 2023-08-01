import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useTimer } from "react-timer-hook";

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";

import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import MedicalCenters, { MedicalCenter } from "../admin/MedicalCenters";

import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";

import TimerBox from "../admin/TimerBox";
import {
  postAIState,
  getAIActiveOrganizations,
  postExamIdAI,
} from "../../service/user.service";
import IdAIApplication from "../admin/IdAIApplication";
import { isEmptyArray } from "formik";
import { AdminViewBoxStyle } from "../../utils/AdminViewConst";

function AdminView() {
  const { t } = useTranslation()

  return (
    <>
      <Header
        tabs={mainMenuPageButtons}
        buttons={mainMenuHeaderButtons}
        headerPositionLg="sticky"
        headerPositionMd="sticky"
        headerPositionXs="sticky"
        onTabValueChange={(index: number) => {}}
      />
      <Typography
        display={"flex"}
        justifyContent={"center"}
        sx={{ color: "#6fb6c1", fontSize: "4rem", fontWeight: "bold" }}
      >
        {t("admin")}
      </Typography>

      <Box sx={AdminViewBoxStyle}>
          <MedicalCenters/>
      </Box>

      <Box  sx={AdminViewBoxStyle}>
        <IdAIApplication/>
      </Box>
      
    </>
  );
}

export default AdminView;
