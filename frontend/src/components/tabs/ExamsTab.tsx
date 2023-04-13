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

  const handleOpenFilter = (): void => {
    setOpenFilter(true);
  };
  const handleCloseFilter = (): void => {
    setOpenFilter(false);
  };

  const handleFilterSubmit = (): void => {
    setOpenFilter(false);
  };
  const [inputValue, setInputValue] = useState<string>("");
  const [filterCondition, setFilterCondition] = useState<boolean>(false);
  
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit = (data: FormInput) : void => {
    console.log("Input:", data.folioSearch);
    console.log(inputValue)
    setInputValue(inputValue);
    if (inputValue !== "" ) {
      setFilterCondition(true);
    } else {
      setFilterCondition(false);
    }
    // Do whatever you need with the input value here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Grid item lg={12} md={12} xs={12} marginBottom={"5%"}>
        <Header
          buttons={mainMenuHeaderButtons}
          tabs={mainMenuPageButtons}
          onTabValueChange={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        mt={"7%"}
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
          justifyContent={"flex-start"}
          sx={{ color: "#061525", fontSize: "4rem" }}
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
                onChange={handleInputChange}/>
              <IconButton type="submit">
                <Search
                onClick={handleSubmit(onSubmit)}/>
              </IconButton>
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
            sx={{ color: "#404040", fontSize: "1.5rem" }}
          >
            <ExamTable useFilter={filterCondition} filterId={inputValue}  />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} xs={12} md={12}></Grid>
      <Footer footerPosition={"static"} />
    </>
  );
};

export default ExamsTab;
