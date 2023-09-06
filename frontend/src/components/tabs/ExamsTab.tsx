import { SyntheticEvent, useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Box,
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
import { useLocation } from "react-router-dom";
import { FilterComponentProps } from "../../utils/FiltersConst";
import FiltersComponent from "../specialExamTable/FiltersComponent";
import { FormInput, filterOption } from "../../utils/ExamTableConst";

function ExamsTab() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const [filterReviewCondition, setFilterReviewCondition] = useState<filterOption>("");
  const [filterStateCondition, setFilterStateCondition] = useState<filterOption>("");
  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormInput>();
  const [openSnackBarValidation, setOpenSnackBarValidation] = useState<boolean>(false);
  const [openSnackBarUndoValidation, setOpenSnackBarUndoValidation] = useState<boolean>(false);

  const query = new URLSearchParams(useLocation().search);
  const validated = query.get('validation');
  const rejected = query.get('undoValidation');
  
  const filters: FilterComponentProps[] = [{
    conditionValue: filterReviewCondition,
    label: "filterByReview",
    setCondition: setFilterReviewCondition,
    trueOption: "reviewed",
    falseOption: "toReview",
  }, 
  {
    conditionValue: filterStateCondition,
    label: "filterByState",
    setCondition: setFilterStateCondition,
    trueOption: "accepted",
    falseOption: "rejected",
  },]

  const onSubmit = (data: FormInput) => {
    setInputValue(data.folioSearch);
    setApplyFilter(!applyFilter);
  };

  const handleApplyButton = () => {
    setApplyFilter(!applyFilter);
  }

  const handleCloseSnackBar = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBarValidation(false);
    setOpenSnackBarUndoValidation(false);
  };

  useEffect(() => {
    if(validated){
      setOpenSnackBarValidation(true);
    } else if(rejected){
      setOpenSnackBarUndoValidation(true);
    }
  }, []);

  return (
    <>
      <Header
        buttons={mainMenuHeaderButtons}
        tabs={mainMenuPageButtons}
        headerPositionLg="sticky"
        headerPositionMd="sticky"
        headerPositionXs="sticky"
        onTabValueChange={function (index: number) {
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
              <FiltersComponent filterComponentProps={filters} handleApplyButton={handleApplyButton}/>
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
            <ExamTable 
              applyFilter={applyFilter} 
              filterStateCondition={filterStateCondition} 
              filterReviewCondition={filterReviewCondition}
              filterId={inputValue}  
            />
          </Grid>
        </Grid>
      </Grid>
      <Box style={{width: "100%",bottom: 0, textAlign: "center", position: "relative"}}>
        <Footer 
        footerPositionLg="sticky"
        footerPositionMd="sticky"
        footerPositionXs="sticky" 
        />
      </Box>
    </>
  );
};


export default ExamsTab;
