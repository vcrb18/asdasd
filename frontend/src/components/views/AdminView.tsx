import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import MedicalCenters, { MedicalCenter } from "../admin/MedicalCenters";

import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";

import TimerBox from "../admin/TimerBox";
import { postAIState } from "../../service/user.service";
import IdAIApplication from "../admin/IdAIApplication";


function AdminView(){
  const { t } = useTranslation();

  const [examIdToApply, setExamIdToApply] = useState<string>("");
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [amountOfTimeActive, setAmountOfTimeActive] = useState<number>(0);
  const [actualMedicalCenters, setActualMedicalCenter] = useState<
    MedicalCenter[]
  >([]);

  const handleMedicalCenterSelect = (newMedicalCenter: MedicalCenter) => {
    if (!actualMedicalCenters.includes(newMedicalCenter)) {
      setActualMedicalCenter([...actualMedicalCenters, newMedicalCenter]);
    }
  };

  const handleActiveTimerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveTimer(event.target.checked);
  };

  const handleAmountTimeActiveChange = (time: number) => {
    setAmountOfTimeActive(time);
  };

  const handleApplyButton = () => {
    postAIState(activeTimer, amountOfTimeActive);
  };

  const handleIdApplication = (examId: string) => {
    setExamIdToApply(examId);
  };

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
      <MedicalCenters
        actualMedicalCenters={actualMedicalCenters}
        onNewMedicalCenter={handleMedicalCenterSelect}
      />
      <Box>
        <IdAIApplication onClickIdApplication={handleIdApplication} />
      </Box>
      <Box>
        <TimerBox
          activeTimer={activeTimer}
          amountOfTimeActive={amountOfTimeActive}
          onActiveTimerChange={handleActiveTimerChange}
          onAmountOfTimeActiveChange={handleAmountTimeActiveChange}
        />
      </Box>
      <Button
        sx={{
          backgroundColor: "#007088",
          color: "#000000",
          width: "auto",
        }}
        variant="contained"
        onClick={handleApplyButton}
        fullWidth
      >
        <Typography color={"#ffffff"}>{t("applyChanges")}</Typography>
      </Button>
      <Footer
        footerPositionLg="absolute"
        footerPositionMd="absolute"
        footerPositionXs="relative"
      />
    </>
  );
}

export default AdminView;
