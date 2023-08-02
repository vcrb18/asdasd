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

  const getTimerSelect = (index: number, value: number) => {
    if (value === 0) {
      return (
        <MenuItem disabled key={index} value={value}>
          <Typography>
            {t("selectTime")}
          </Typography>
        </MenuItem>
      );
    } else if (value === 1) {
      return (
        <MenuItem key={index} value={value}>
          <Typography>
            {value} {t("minute")}
          </Typography>
        </MenuItem>
      );
    } else {
      return (
        <MenuItem key={index} value={value}>
          <Typography>
            {value} {t("minutes")}
          </Typography>
        </MenuItem>
      );
    }
  };

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
            sx={{ width: "92%", bgcolor: timeError ? "#DE8989" : "#fff"}}
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
