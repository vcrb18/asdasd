import React from "react";

import { useTranslation } from "react-i18next";

import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";

import { timeSelect } from "../../utils/AdminViewConst";
import AdminBox from "./AdminBox";

interface TimerBoxProps {
  activeTimer: boolean;
  amountOfTimeActive: number;
  onActiveTimerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountOfTimeActiveChange: (time: number) => void;
}

function TimerBox({activeTimer, amountOfTimeActive, onActiveTimerChange, onAmountOfTimeActiveChange }: TimerBoxProps){
  const { t } = useTranslation();
  const handleActiveTimerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onActiveTimerChange(event);
  };
  const handleAmountOfTimeActiveChange = (event: SelectChangeEvent<number>) => {
    onAmountOfTimeActiveChange(event.target.value as number);
  };

  const getTimerSelect = (key: string, value: number) => {
    if (value === 1){
      return (
        <MenuItem key={key} value={value}>
          {value} {t('minute')}
        </MenuItem>
      )
    } else {
      return (
        <MenuItem key={key} value={value}>
          {value} {t('minutes')}
        </MenuItem>
      )
    }
  }

  return (
    <Box display={"flex"} width={"100%"}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-around"}
        marginX={"10%"}
      >
        <AdminBox text="activeTime"/>
        <Grid item lg={6} md={6} sm={6} xs={12}  display={"flex"} justifyContent= {"center"} >
          <Select
            value={amountOfTimeActive}
            onChange={handleAmountOfTimeActiveChange}
            sx={{ width: "80%"}}
          >
            {Object.entries(timeSelect).map(([key, value]) => {
              return (
                getTimerSelect(key,value)
              );
            })}
          </Select>
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FormControlLabel
            control={
              <Switch
                name="active"
                checked={activeTimer}
                onChange={handleActiveTimerChange}
              />
            }
            label=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}
export default TimerBox