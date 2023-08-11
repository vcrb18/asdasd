import { Button, Grid, Typography } from "@mui/material";

import AdminBox from "./AdminBox";
import MedicalCenterSearch from "./MedicalCenterSearch";

import MedicalCenterList from "./MedicalCenterList";
import { isEmptyArray } from "formik";
import TimerBox from "./TimerBox";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import { getAIActiveOrganizations, postAIState } from "../../service/user.service";


export interface MedicalCenter {
  organizationId: number;
  legalName: string;
  responseTime: number;
}

function MedicalCenters() {

  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation()

  const timeToRender = new Date();
  
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

  let hasTimerChanged = false;

  const [activeTimer, setActiveTimer] = useState<boolean>(false)
  const [timeError, setTimeError] = useState<boolean>(false);
  const [medicalCenterError, setMedicationCenterError] = useState<boolean>(false)
  const [amountOfTimeActive, setAmountOfTimeActive] = useState<number>(0);
  const [activeMedicalCenters, setActiveMedicalCenter] = useState<
    MedicalCenter[]
  >([]);
  const [medicalCentersToAdd, setMedicalCentersToAdd] = useState<
    MedicalCenter[]
  >([]);

  const handleModifyParameters = () => {
    navigate("/admin/modifyparams");
  };

  const handleTimeExpire = () => {
    setMedicalCentersToAdd(activeMedicalCenters);
    setActiveMedicalCenter([]);
    setActiveTimer(false);
  };

  const handleMedicalCenterSelect = (newMedicalCenter: MedicalCenter) => {
    if (!medicalCentersToAdd.includes(newMedicalCenter)) {
      const newMedicalCenters = [...medicalCentersToAdd, newMedicalCenter];
      const medicalCentersOrder = newMedicalCenters.sort((a, b) => (a.legalName > b.legalName ? 1 : -1));
      setMedicalCentersToAdd(medicalCentersOrder);
    }
  };

  const handleDeleteClick = (id: number): void => {
    setMedicalCentersToAdd(
      medicalCentersToAdd.filter((i) => i.organizationId !== id)
    );
  };

  const handleMedicalCentersToAdd = (medicalCenters: MedicalCenter[]): void => {
    setMedicalCentersToAdd(medicalCenters);
  }
  
  const handleApplyButton = () => {
    const isMedicalCenterRequired = medicalCentersToAdd.length === 0 && !activeTimer;
    const isTimeRequired = amountOfTimeActive === 0 && !activeTimer;
    if(isMedicalCenterRequired){
      setMedicationCenterError(true)
      return;
    }
    if(isTimeRequired){
      setTimeError(true);
      return;
    }
    const array = activeTimer ? activeMedicalCenters : medicalCentersToAdd ;
    const arrayIds: number[] = array.map(
      (medicalCenter) => medicalCenter.organizationId
      );
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + amountOfTimeActive*60);
      postAIState(
        activeTimer,
        amountOfTimeActive,
        arrayIds,
        false
        ).then((res) => {
          if(activeTimer){
            setActiveTimer(false);
            setMedicalCentersToAdd(activeMedicalCenters);
            setActiveMedicalCenter([]);
          } else{
            setActiveTimer(true);
            setMedicalCentersToAdd([]);
            setActiveMedicalCenter(medicalCentersToAdd);
            restart(newTime);
          }
        });
  };

  const handleCleanButton = () => { 
    setMedicalCentersToAdd([]);
  }

  const handleMedicalCenterError = (error: boolean) => { 
    setMedicationCenterError(error);
  }

  useEffect(() => {
    getAIActiveOrganizations().then((medicalCenters) => {
      if (!hasTimerChanged) {
        hasTimerChanged = true;
        timeToRender.setSeconds(
          timeToRender.getSeconds() + medicalCenters.data.timeRemainingInSeconds
        );
        const areActiveMedicalCenters = !isEmptyArray(medicalCenters.data.organizations)
        if(areActiveMedicalCenters){
          setActiveTimer(true);
          setActiveMedicalCenter(medicalCenters.data.organizations);
          setMedicalCentersToAdd([]);
        }
      }
    });
  }, []);

  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
      > 
        <AdminBox text="medicalCenter" />
        
        <MedicalCenterSearch
          handleMedicalCentersToAdd={handleMedicalCentersToAdd}
          onNewMedicalCenter={handleMedicalCenterSelect}
          setMedicalCenterError={handleMedicalCenterError}
          medicalCenterError={medicalCenterError}
          activeTimer={activeTimer}
        />
            
        <TimerBox
          amountOfTimeActive={amountOfTimeActive}
          onAmountOfTimeActiveChange={setAmountOfTimeActive}
          setTimeError={setTimeError}
          timeError={timeError}
        />
        
        <MedicalCenterList
          activeMedicalCenters={activeMedicalCenters}
          medicalCentersToAdd={medicalCentersToAdd}
          timeActiveLeft={[minutes, seconds]}
          handleDeleteClick={handleDeleteClick}
        />
        
        <Button
          sx={{
            backgroundColor: "#007088",
            color: "#000000",
            width: "auto",
            marginX:"10%",
          }}
          variant="contained"
          onClick={handleModifyParameters}
        >
          <Typography color={"#ffffff"}>{t("modifyParams")}</Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "#007088",
            color: "#000000",
            width: "auto",
          }}
          variant="contained"
          onClick={handleCleanButton}
        >
          <Typography color={"#ffffff"}>{t("cleanCenters")}</Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "#007088",
            color: "#000000",
            width: "auto",
            marginX:"10%",
          }}
          variant="contained"
          onClick={handleApplyButton}
        >
          <Typography color={"#ffffff"}>{activeTimer ? t("deactivateAI") : t("activateAI")}</Typography>
        </Button>

      </Grid>
    </>
  );
}

export default MedicalCenters;
