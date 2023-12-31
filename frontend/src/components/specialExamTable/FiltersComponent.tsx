import {
  SelectChangeEvent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";
import {
  FilterComponentProps,
  FiltersComponentProps,
  filterOption,
} from "../../utils/FiltersConst";
import { useTranslation } from "react-i18next";
import { buttonsTheme } from "../../utils/ExamTableConst";

function FilterComponent({
  conditionValue,
  label,
  setCondition,
  bothOption,
  trueOption,
  falseOption,
}: FilterComponentProps) {
  const { t } = useTranslation();

  const handleOnChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as filterOption);
  };

  return (
    <Grid item xs={2} sm={2} md={2} lg={2} paddingY={"2%"}>
      <FormControl fullWidth variant="standard">
        <InputLabel>{t(label)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={conditionValue}
          label={t(label)}
          onChange={handleOnChange}
        >
          <MenuItem value={bothOption}>{t("dontApply")}</MenuItem>
          <MenuItem value={trueOption}>{t(trueOption)}</MenuItem>
          <MenuItem value={falseOption}>{t(falseOption)}</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

function FiltersComponent({
  filterComponentProps,
  handleApplyButton,
}: FiltersComponentProps) {
  const { t } = useTranslation();

  return (
    <Grid container display={"flex"} justifyContent={"space-around"}>
      {filterComponentProps.map(
        ({
          conditionValue,
          label,
          setCondition,
          bothOption,
          trueOption,
          falseOption,
        }: FilterComponentProps) => {
          return (
            <FilterComponent
              conditionValue={conditionValue}
              label={label}
              setCondition={setCondition}
              bothOption={bothOption}
              trueOption={trueOption}
              falseOption={falseOption}
            />
          );
        }
      )}
      <Grid item xs={2} sm={2} md={2} lg={2} paddingY={"2%"}>
        <ThemeProvider theme={buttonsTheme}>
          <Button
            color="primary"
            variant="contained"
            sx={{ color: "#fff" }}
            onClick={handleApplyButton}
          >
            <Typography fontSize={"120%"} color={"#fff"}>
              {t("applyFilter")}
            </Typography>
          </Button>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default FiltersComponent;
