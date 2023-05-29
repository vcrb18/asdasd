import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import ExamTable from "../tables/ExamTable";
import { useTranslation } from "react-i18next";
import FilterComponent from "../customComponents/FilterComponent";
import { Folder, Search } from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Header from "../customComponents/Header";
import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";
import Footer from "../customComponents/Footer";
import { useForm } from "react-hook-form";
import { truncate } from "fs";

type FormInput = {
  folioSearch: string;
}

const ExamsTab = (): JSX.Element => {
  const { t } = useTranslation();

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filterCondition, setFilterCondition] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormInput>();

  const handleOpenFilter = (): void => {
    setOpenFilter(true);
  };
  const handleCloseFilter = (): void => {
    setOpenFilter(false);
  };

  const handleFilterSubmit = (): void => {
    setOpenFilter(false);
  };
  

  const onSubmit = (data: FormInput) : void => {
    setInputValue(data.folioSearch);
    if (inputValue !== "") {
      setFilterCondition(true);
    } else {
      setFilterCondition(false);
    }
    // Do whatever you need with the input value here
  };


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
        sx={{
          width: "100%",
          alignItems: "flex-start",
          height: "100%",
        }}
      >
        <Typography
          paddingLeft={"3%"}
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
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          padding={5}
        >
          <Grid container lg={12} xs={12} md={12} columnSpacing={3} display={'flex'} justifyContent={'flex-end'}>
            <Grid item lg={10} md={10} xs={10} display={'flex'} justifyContent={'flex-end'}>
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
            <Grid item lg={2} md={2} xs={2}>
              <IconButton onClick={handleOpenFilter} sx={{ color: "#000" }}>
                <FilterListIcon>{t("filter")}</FilterListIcon>
              </IconButton>
            </Grid>
          </Grid>
          <Dialog fullWidth open={openFilter} onClose={handleCloseFilter}>
            <DialogTitle>
              <Typography fontSize={"100%"}>{t("filter")}</Typography>
            </DialogTitle>
            <DialogContent >
              <FilterComponent handleSubmit={handleFilterSubmit} filterType="exams"/>  
            </DialogContent>
          </Dialog>
          <Grid
            item
            lg={12}
            xs={12}
            md={12}
            display={"flex"}
            justifyContent={"flex-start"}
            sx={{ fontSize: "1.5rem" }}
          >
            <ExamTable useFilter={filterCondition} filterId={inputValue}  />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} xs={12} md={12}></Grid>
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
