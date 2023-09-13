import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { isEmptyArray } from 'formik';

import { removeClientToken, setClientToken } from '@/api/client';
import GenericButton from '@/atoms/Button';
import { useAuth } from '@/hooks/AuthContext';

import { Grid } from '@mui/material';

import { MedicalCenter } from '@/utils/AdminViewInterfaces';

import { activateAI, deactivateAI, getAIActiveOrganizations } from '../../api/users.service';
import AdminBox from './AdminBox';
import MedicalCenterList from './MedicalCenterList';
import MedicalCenterSearch from './MedicalCenterSearch';
import TimerBox from './TimerBox';

function MedicalCenters() {
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const timeToRender = useRef(new Date());

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: timeToRender.current,
    onExpire: () => handleTimeExpire(),
  });

  const { store } = useAuth();
  const hasTimerChanged = useRef(false);
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [amountOfTimeActive, setAmountOfTimeActive] = useState<number | string>('');
  const [activeMedicalCenters, setActiveMedicalCenter] = useState<MedicalCenter[]>([]);
  const [medicalCentersToAdd, setMedicalCentersToAdd] = useState<MedicalCenter[]>([]);

  const handleModifyParameters = () => {
    navigate('/admin/modifyparams');
  };

  const handleTimeExpire = () => {
    setActiveMedicalCenter([]);
    setMedicalCentersToAdd([]);
    setActiveTimer(false);
  };

  const handleMedicalCenterSelect = (newMedicalCenter: MedicalCenter) => {
    if (!medicalCentersToAdd.includes(newMedicalCenter)) {
      setMedicalCentersToAdd([...medicalCentersToAdd, newMedicalCenter]);
    }
  };

  const handleDeleteClick = (id: number): void => {
    setMedicalCentersToAdd(medicalCentersToAdd.filter((i) => i.organizationId !== id));
  };

  const handleMedicalCentersToAdd = (medicalCenters: MedicalCenter[]): void => {
    setMedicalCentersToAdd(medicalCenters);
  };

  const handleApplyButton = () => {
    const targetArray = activeTimer ? activeMedicalCenters : medicalCentersToAdd;
    const arrayIds = targetArray.map((medicalCenter) => medicalCenter.organizationId);
    const newTime = calculateNewTime(amountOfTimeActive);

    if (activeTimer) {
      deactivateAI(arrayIds, false).then(() => {
        handlePostSuccess(newTime, false);
      });
    } else {
      activateAI(amountOfTimeActive, arrayIds, false).then(() => {
        handlePostSuccess(newTime, true);
      });
    }
  };

  const calculateNewTime = (amountOfTimeActive: number) => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + amountOfTimeActive * 60);
    return newTime;
  };

  const handlePostSuccess = (newTime: Date, activate: boolean) => {
    setActiveTimer(activate);
    setMedicalCentersToAdd([]);
    restart(newTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClientToken(store);

        const medicalCenters = await getAIActiveOrganizations();
        if (!hasTimerChanged.current) {
          hasTimerChanged.current = true;

          const timeRemainingInSeconds = medicalCenters.data.timeRemainingInSeconds;
          timeToRender.current.setSeconds(timeToRender.current.getSeconds() + timeRemainingInSeconds);

          setActiveTimer(!isEmptyArray(medicalCenters.data.organizations));
          setActiveMedicalCenter(medicalCenters.data.organizations);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        removeClientToken();
      }
    };

    fetchData();
  }, [activeTimer, timeToRender, store]);

  return (
    <Grid container display={'flex'} justifyContent={'space-between'}>
      <Grid container display={'flex'} justifyContent={'space-between'} marginLeft={'2%'}>
        <AdminBox text="medicalCenter" />

        <MedicalCenterSearch
          handleMedicalCentersToAdd={handleMedicalCentersToAdd}
          onNewMedicalCenter={handleMedicalCenterSelect}
        />

        <TimerBox amountOfTimeActive={amountOfTimeActive} onAmountOfTimeActiveChange={setAmountOfTimeActive} />

        <MedicalCenterList
          activeMedicalCenters={activeMedicalCenters}
          medicalCentersToAdd={medicalCentersToAdd}
          timeActiveLeft={[minutes, seconds]}
          handleDeleteClick={handleDeleteClick}
        />

        <TimerBox amountOfTimeActive={amountOfTimeActive} onAmountOfTimeActiveChange={setAmountOfTimeActive} />
      </Grid>

      <MedicalCenterList
        activeMedicalCenters={activeMedicalCenters}
        medicalCentersToAdd={medicalCentersToAdd}
        timeActiveLeft={[minutes, seconds]}
        handleDeleteClick={handleDeleteClick}
      />

      <GenericButton label={t('admin.modifyParams')} onPress={handleModifyParameters} />
      <GenericButton
        label={activeTimer ? t('admin.deactivateAI') : t('admin.activateAI')}
        onPress={handleApplyButton}
      />
    </Grid>
  );
}

export default MedicalCenters;
