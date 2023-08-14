import React from "react";

import { useTranslation } from "react-i18next";

import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { timeSelect } from "../../utils/AdminViewConst";
import AdminBox from "./AdminBox";

interface TimerBoxProps {
  amountOfTimeActive: number;
  onAmountOfTimeActiveChange: (time: number) => void;
  setTimeError: (timeError: boolean) => void;
  timeError: boolean;
}

function TimerBox({
  amountOfTimeActive,
  onAmountOfTimeActiveChange,
  setTimeError,
  timeError,
}: TimerBoxProps) {
  const { t } = useTranslation();
  
  const handleAmountOfTimeActiveChange = (event: SelectChangeEvent<number>) => {
    onAmountOfTimeActiveChange(event.target.value as number);
    setTimeError(false);
  };

  const TimeText: React.FC<{ value: number }> = ({ value }) => {
    if (value === 0) return <Typography>{t("selectTime")}</Typography>;
    const plural = value !== 60 && value !== 1 ? 's' : '';
    const unit =  value >= 60 ? 'hour' : 'minute';
    const timeValue = unit === 'minute' ? value : value / 60;
    return <Typography>{timeValue} {t(`${unit}${plural}`)}</Typography>;
};
  
  const getTimerSelect = (index: number, value: number) => {
    return (
      <MenuItem key={index} value={value}>
          <TimeText value={value}/>
      </MenuItem>
    );
  }

  return (
    <Box display={"flex"} width={"100%"} marginY={"1%"}>
      <Grid
        container
        display={"flex"}
      >
        <AdminBox text="activeTime" />
        <Grid
          item
          lg={8}
          md={8}
          sm={8}
          xs={12}
          display={"flex"}
          justifyContent={"center"}
        >
          <Select
            value={amountOfTimeActive}
            onChange={handleAmountOfTimeActiveChange}
            sx={{ width: "92%", bgcolor: timeError ? "#F3C7C8" : "#fff"}}
          >
            
            {timeSelect.map((value, index) => {
              return getTimerSelect(index, value);
            })}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}
export default TimerBox;
