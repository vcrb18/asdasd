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

interface MedicalCenterProps {
  activeMedicalCenters: MedicalCenter[];
  medicalCentersToAdd: MedicalCenter[];
  timeActiveLeft: number[];
  areMedicalCentersActive: boolean;
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  onSelectAllCenters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteClick: (id: number) => void;
  areAllMedicalCentersSelected: boolean;
  areAllMedicalCentersActived: boolean;
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
  const [amountOfTimeActive, setAmountOfTimeActive] = useState<number>(0);
  const [activeMedicalCenters, setActiveMedicalCenter] = useState<
    MedicalCenter[]
  >([]);
  const [medicalCentersToAdd, setMedicalCentersToAdd] = useState<
    MedicalCenter[]
  >([]);

  const [oldMedicalCenters, setOldMedicalCenters] = useState<
    MedicalCenter[]
  >([]);

  const handleModifyParameters = () => {
    navigate("/admin/modifyparams");
  };

  const handleTimeExpire = () => {
    setActiveMedicalCenter([]);
  };

  const handleMedicalCenterSelect = (newMedicalCenter: MedicalCenter) => {
    if (!medicalCentersToAdd.includes(newMedicalCenter)) {
      setMedicalCentersToAdd([...medicalCentersToAdd, newMedicalCenter]);
    }
  };

  const handleDeleteClick = (id: number): void => {
    setMedicalCentersToAdd(
      medicalCentersToAdd.filter((i) => i.organizationId !== id)
    );
  };

  const handleMedicalCentersToAdd = (array: MedicalCenter[]): void => {
    setMedicalCentersToAdd(array);
  }
  
  const handleApplyButton = () => {
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
      setActiveTimer(!activeTimer);
      setOldMedicalCenters(array);
      setMedicalCentersToAdd([]);
      restart(newTime)
    });
  };

  useEffect(() => {
    getAIActiveOrganizations().then((medicalCenters) => {
      if (!hasTimerChanged) {
        hasTimerChanged = true;
        timeToRender.setSeconds(
          timeToRender.getSeconds() + medicalCenters.data.timeRemainingInSeconds
        );
        setActiveTimer(!isEmptyArray(medicalCenters.data.organizations));
        
        setActiveMedicalCenter(medicalCenters.data.organizations);
      }
    });
  }, [activeTimer]);

  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
      > 
        <AdminBox text="medicalCenter" />
        
        <MedicalCenterSearch
          medicalCentersToAdd={medicalCentersToAdd}
          handleMedicalCentersToAdd={handleMedicalCentersToAdd}
          onNewMedicalCenter={handleMedicalCenterSelect}
          onSelectAllCenters={() => {}}
        />
          

        <TimerBox
          amountOfTimeActive={amountOfTimeActive}
          onAmountOfTimeActiveChange={setAmountOfTimeActive}
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
            marginX:"10%",
          }}
          variant="contained"
          onClick={handleApplyButton}
        >
          <Typography color={"#ffffff"}>{activeTimer ? "Desactivar IA" : "Activar IA"}</Typography>
        </Button>

      </Grid>
    </>
  );
}

export default MedicalCenters;
