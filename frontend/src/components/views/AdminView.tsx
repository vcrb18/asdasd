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
import { time } from "console";
import { get } from "http";

function AdminView() {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const timeToRender = new Date();

  let hasTimerChanged = false;

  const [examIdToApply, setExamIdToApply] = useState<string>("");
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [amountOfTimeActive, setAmountOfTimeActive] = useState<number>(0);
  const [actualMedicalCenters, setActualMedicalCenter] = useState<
    MedicalCenter[]
  >([]);
  const [areMedicalCentersActive, setAreMedicalCentersActive] =
    useState<boolean>(false);

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
    const actualMedicalCentersIds: number[] = actualMedicalCenters.map(
      (medicalCenter) => medicalCenter.organizationId
    );
    postAIState(activeTimer, amountOfTimeActive, actualMedicalCentersIds);
    window.location.reload();
  };

  const handleIdApplication = (examId: string) => {
    setExamIdToApply(examId);
    postExamIdAI(examId);
    navigate(`/examsview/${examId}`);
  };

  const handleTimeExpire = () => {
    setActiveTimer(false);
    setAreMedicalCentersActive(false);
    setActualMedicalCenter([]);
  };

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: timeToRender,
    onExpire: () => handleTimeExpire(),
  });

  useEffect(() => {
    getAIActiveOrganizations().then((medicalCenters) => {
      if (!hasTimerChanged) {
        hasTimerChanged = true;
        timeToRender.setSeconds(
          timeToRender.getSeconds() + medicalCenters.data.timeRemainingInSeconds
        );
        setActualMedicalCenter(medicalCenters.data.organizations);
        setActiveTimer(!isEmptyArray(medicalCenters.data.organizations));
        setAreMedicalCentersActive(
          !isEmptyArray(medicalCenters.data.organizations)
        );
      }
    });
  }, []);

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
      {seconds != undefined && minutes != undefined ? (
        <MedicalCenters
          actualMedicalCenters={actualMedicalCenters}
          onNewMedicalCenter={handleMedicalCenterSelect}
          areMedicalCentersActive={areMedicalCentersActive}
          timeActiveLeft={[minutes, seconds]}
        />
      ) : (
        <></>
      )}
      <Box>
        <TimerBox
          activeTimer={activeTimer}
          amountOfTimeActive={amountOfTimeActive}
          onActiveTimerChange={handleActiveTimerChange}
          onAmountOfTimeActiveChange={handleAmountTimeActiveChange}
        />
      </Box>
      <Box>
        <IdAIApplication onClickIdApplication={handleIdApplication} />
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
        footerPositionMd="relative"
        footerPositionXs="static"
      />
    </>
  );
}

export default AdminView;
