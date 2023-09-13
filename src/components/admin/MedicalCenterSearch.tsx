import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { removeClientToken, setClientToken } from '@/api/client';
import { useAuth } from '@/hooks/AuthContext';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { MedicalCentersApi } from '../../api/medicalCenters';
import { timeRestrictionSelect } from '../../utils/AdminViewConst';
import { MedicalCenter, MedicalCenterSearchProps } from '../../utils/AdminViewInterfaces';

function MedicalCenterSearch({ onNewMedicalCenter, handleMedicalCentersToAdd }: MedicalCenterSearchProps) {
  const { store } = useAuth();
  const { t } = useTranslation();
  const [medicalCentersForAI, setMedicalCentersForAI] = useState<MedicalCenter[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [medicalCenterToAdd, setMedicalCenterToAdd] = useState<MedicalCenter>();
  const [timeToRestriction, setTimeToRestriction] = useState<number>(0);

  useEffect(() => {
    setClientToken(store);
    const allMedicalCenters = MedicalCentersApi.getMedicalCenters().then((medicalCenters) =>
      medicalCenters.data.sort((a: MedicalCenter, b: MedicalCenter) => (a.legalName > b.legalName ? 1 : -1)),
    );
    allMedicalCenters.then((res) => setMedicalCentersForAI(res));
    removeClientToken();
  }, [store]);

  const handleCloseMedicalCenter = (): void => {
    setOpenDialog(false);
  };

  const handleMedicalCenterSubmit = (): void => {
    if (medicalCenterToAdd) {
      onNewMedicalCenter(medicalCenterToAdd);
    }
  };
  const handleMedicalCenterSelect = (
    _event: SyntheticEvent<Element, Event>,
    newMedicalCenter: MedicalCenter | null,
  ) => {
    setMedicalCenterToAdd(newMedicalCenter as MedicalCenter);
  };

  const handleActiveAllMedicalCenters = () => {
    const medicalCentersFilters: MedicalCenter[] = medicalCentersForAI.filter(
      (medicalCenter) => medicalCenter.responseTime > timeToRestriction,
    );
    handleMedicalCentersToAdd(medicalCentersFilters);
    setOpenDialog(false);
  };
  const handleMedicalCenterRestriction = (event: SelectChangeEvent<number>) => {
    setTimeToRestriction(event.target.value as number);
  };

  const getTimerSelect = (index: number, value: number) => {
    return (
      <MenuItem key={index} value={value}>
        {value === 0 ? t('withoutRestrictions') : t('moreThan')} {value} {t('minutes')}
      </MenuItem>
    );
  };

  return (
    <Grid item lg={8} md={8} sm={8} xs={8} display={'flex'} justifyContent={'center'} alignContent={'center'}>
      <Grid item lg={6} md={6} sm={6} xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Autocomplete
          getOptionLabel={(option) => option.legalName}
          options={medicalCentersForAI}
          sx={{ width: '75%', bgcolor: '#ffffff' }}
          renderInput={(params) => <TextField {...params} label={t('centerSelection')} />}
          onChange={handleMedicalCenterSelect}
        />
        <IconButton size="large" edge={'end'} onClick={handleMedicalCenterSubmit}>
          <AddIcon fontSize={'inherit'} sx={{ color: '#007088' }} />
        </IconButton>
      </Grid>

      <Grid item lg={6} md={6} sm={6} xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button
          sx={{
            backgroundColor: '#007088',
            color: '#000000',
            width: 'auto',
          }}
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
          }}
          fullWidth
        >
          <Typography color={'#ffffff'}>{t('selectAll')}</Typography>
        </Button>
      </Grid>
      <Dialog fullWidth={true} maxWidth={'sm'} open={openDialog} onClose={handleCloseMedicalCenter}>
        <DialogTitle display={'flex'} justifyContent={'center'} alignItems={'center'}>
          {t('restrictions')}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
              <Typography color={'#007088'} fontWeight={'bold'}>
                {t('responseTime')}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Select
                value={timeToRestriction}
                onChange={handleMedicalCenterRestriction}
                sx={{ width: '100%', bgcolor: '#fff' }}
              >
                {timeRestrictionSelect.map((value: number, index: number) => {
                  return getTimerSelect(index, value);
                })}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#007088',
              color: '#000000',
              width: 'auto',
            }}
            variant="contained"
            onClick={handleCloseMedicalCenter}
            fullWidth
          >
            <Typography color={'#ffffff'}>{t('cancel')}</Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: '#007088',
              color: '#000000',
              width: 'auto',
            }}
            variant="contained"
            onClick={handleActiveAllMedicalCenters}
            fullWidth
          >
            <Typography color={'#ffffff'}>{t('submit')}</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MedicalCenterSearch;
