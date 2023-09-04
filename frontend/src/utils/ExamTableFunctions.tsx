import { Avatar, Box, Typography } from "@mui/material";
import { t } from "i18next";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import Check from "../../src/static/images/checkVerde.png"
import X from "../../src/static/images/X.png"

export const formatDate = (dateString: string): JSX.Element => {
  const date = new Date(dateString);
  return (
    <Typography color={"#878787"} fontWeight={"bold"}>
      {date.toLocaleString('es-CL',{timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})}
    </Typography>
    )
};

export const getRemainingTimeColor = (colorNumber: number): "error" | "success" | "warning" => {
  if (colorNumber === 1) {
    return "success";
  } else if (colorNumber === 2) {
    return "warning";
  }
  return "error";
};

export const colorSwitcher = (value: boolean): string => {
  return value ? "green" : "red";
}

export const getStatus = (state: boolean) => (
  <Typography
    fontWeight={"bold"}
    color={colorSwitcher(state)}
    >
      {state?  t("accepted") : t("rejected")}
</Typography>
);

export const getUrgency = (urgency: number): JSX.Element => (
  <Brightness1RoundedIcon color={getRemainingTimeColor(urgency)} />
);
   
export const getChecks = (state: boolean): JSX.Element => (
  <Box display="flex" justifyContent="center">
    <Avatar src={state ? Check : X} alt={state ? "checkVerde" : "checkRojo"} variant="square" />
  </Box>
);

export const parseTime = (time: string) => {
  let timeParser = '';
  let timeSplit = time.split(' ');
  timeParser += t(timeSplit[1]);
  if(timeParser.includes("X")){
  timeParser = timeParser.replace("X", timeSplit[0]);
  } else{
    timeParser = timeSplit[0] + " " + timeParser;
  } 
  return timeParser
}
