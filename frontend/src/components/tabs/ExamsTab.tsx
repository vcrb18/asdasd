import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ExamTable from "../tables/ExamTable";
import { useTranslation } from "react-i18next";
import Header from "../customComponents/Header";
import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";
import Footer from "../customComponents/Footer";
import { useForm } from "react-hook-form";
import { truncate } from "fs";
import { useLocation } from "react-router-dom";

type FormInput = {
  folioSearch: string;
}
type filterStateTypes = {
  rejected: boolean,
  accepted: boolean,
}
type filterReviewTypes = {
  reviewed: boolean,
  notReviewed: boolean,
}
const ExamsTab = (): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const [filterReviewCondition, setFilterReviewCondition] = useState<boolean>(false);
  const [filterStateCondition, setFilterStateCondition] = useState<boolean>(false);
  const [filterIdCondition, setFilterIdCondition] = useState<boolean>(false);
  const [filterState, setFilterState] = React.useState<filterStateTypes>({
    rejected: true,
    accepted: true,
  });
  const [filterReview, setFilterReview] = React.useState<filterReviewTypes>({
    reviewed: true,
    notReviewed: true,
  })
  const { register, handleSubmit } = useForm<FormInput>();
  const [openSnackBarValidation, setOpenSnackBarValidation] = useState<boolean>(false);
  const [openSnackBarUndoValidation, setOpenSnackBarUndoValidation] = useState<boolean>(false);



  const onSubmit = (data: FormInput) : void => {
    setInputValue(data.folioSearch);
    if (inputValue !== "") {
      setFilterIdCondition(true);
    } else {
      setFilterIdCondition(false);
    } 
    // Do whatever you need with the input value here
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBarValidation(false);
    setOpenSnackBarUndoValidation(false);
  };

  const query = new URLSearchParams(useLocation().search);
  const validated = query.get('validation');
  const rejected = query.get('undoValidation');

  useEffect(() => {
    if(validated){
      setOpenSnackBarValidation(true);
    } else if(rejected){
      setOpenSnackBarUndoValidation(true);
    }
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target.name == "accepted" && filterState.rejected == true && event.target.checked) || (event.target.name == "rejected" && filterState.accepted == true && event.target.checked)){
      setFilterState({
        ...filterState,
        [event.target.name] : event.target.checked
      });
      setFilterStateCondition(false)
    }
    else if ((event.target.name == "accepted" && filterState.rejected == false && !event.target.checked) || (event.target.name == "rejected" && filterState.accepted == false && !event.target.checked)){
      setFilterState({
        ...filterState,
        [event.target.name] : event.target.checked
      });
      setFilterStateCondition(false)
    }
    else {
      setFilterState({
        ...filterState,
        [event.target.name]: event.target.checked,
      });
      setFilterStateCondition(true)
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target.name == "reviewed" && filterReview.notReviewed == true && event.target.checked) || (event.target.name == "notReviewed" && filterReview.reviewed == true && event.target.checked)){
      setFilterReview({
        ...filterReview,
        [event.target.name] : event.target.checked
      });
      setFilterReviewCondition(false)
    }
    else if ((event.target.name == "reviewed" && filterReview.notReviewed == false && !event.target.checked) || (event.target.name == "notReviewed" && filterReview.reviewed == false && !event.target.checked)){
      setFilterReview({
        ...filterReview,
        [event.target.name] : event.target.checked
      });
      setFilterReviewCondition(false)
    }
    else {
      setFilterReview({
        ...filterReview,
        [event.target.name]: event.target.checked,
      });
      setFilterReviewCondition(true)
    }
  };
  const SwitchesGroup = () => {
    return (
      <Grid container display={"flex"} justifyContent={"space-around"}>
        <Grid item xs={12} sm={6} md={6} lg={6} paddingY={"1%"}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">
              <Typography fontWeight={"bold"}>
                {t("filterByReview")}
              </Typography>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={filterReview.reviewed} onChange={handleReviewChange} name="reviewed" />
                }
                label={
                  <Typography>
                    {t("reviewed")}
                  </Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={filterReview.notReviewed} onChange={handleReviewChange} name="notReviewed" />
                }
                label={
                  <Typography>
                    {t("toReview")}
                  </Typography>}
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} paddingY={"1%"}>
          <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">
                <Typography fontWeight={"bold"}>
                  {t("filterByState")}
                </Typography>
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={filterState.accepted} onChange={handleStateChange} name="accepted"/>
                  }
                  label={
                    <Typography>
                      {t("accepted")}
                    </Typography>}
                />
                <FormControlLabel
                  control={
                    <Switch checked={filterState.rejected} onChange={handleStateChange} name="rejected" />
                  }
                  label={
                    <Typography>
                      {t("rejected")}
                    </Typography>}
                />
              </FormGroup>
            </FormControl>
        </Grid>
      </Grid>

    );
  }
  

  return (
    <>
      <Header
          buttons={mainMenuHeaderButtons}
          tabs={mainMenuPageButtons}
          headerPositionLg="sticky"
          headerPositionMd="sticky"
          headerPositionXs="sticky"
          onTabValueChange={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
      />
      <Snackbar open={openSnackBarValidation} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          {t("validationMessage")}
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackBarUndoValidation} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="warning" sx={{ width: '100%' }}>
          {t("undoValidationMessage")}
        </Alert>
      </Snackbar>
      <div style={{height: "100%", position: "relative"}}>
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        mb={"3%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          display={"flex"}
          justifyContent={"center"}
          sx={{ color: "#6fb6c1", fontSize: "4rem", fontWeight: "bold" }}
        >
          {t("exams")}
        </Typography>
        <Divider variant="middle" />
        <Grid
          container
          lg={12}
          paddingX={"3%"}
        >
          <Grid container lg={12} xs={12} md={12} display={'flex'} justifyContent={"space-evenly"} alignItems={"center"} paddingY={"2%"}>
            <Grid item lg={4} md={4} sm={12} xs={12} display={'flex'} justifyContent={'center'}>
              <form onSubmit={handleSubmit(onSubmit)}> 
              <TextField 
                id="folio-search"
                label={t("folioSearch")} 
                variant="filled"
                size="small"
                {...register("folioSearch")}
                />
              </form>
            </Grid>
            <Grid container lg={8} md={8} sm={12} xs={12}>
              <SwitchesGroup/>
            </Grid>
          </Grid>
          <Grid
            item
            lg={12}
            xs={12}
            md={12}
            display={"flex"}
            justifyContent={"flex-start"}
            sx={{ fontSize: "1.5rem" }}
          >
            <ExamTable filterReview={filterReview} filterStates={filterState} useStateFilter={filterStateCondition} useReviewFilter={filterReviewCondition} useIdFilter={filterIdCondition} filterId={inputValue}  />
          </Grid>
        </Grid>
      </Grid>
      </div>
      <div style={{width: "100%",bottom: 0, textAlign: "center", position: "relative"}}>
    <Footer 
      footerPositionLg="sticky"
      footerPositionMd="sticky"
      footerPositionXs="sticky" />
      </div>
    </>
  );
};


export default ExamsTab;
