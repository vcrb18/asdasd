import React, { useEffect, useState } from "react";
import Footer from "../customComponents/Footer";
import Header from "../customComponents/Header";
import { mainMenuHeaderButtons, mainMenuPageButtons } from "../../utils/routingPropConsts";
import { Grid, Typography, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ExamTableGroupB from "./ExamTableGroupB";
import { filterOption, FormInput } from "../../utils/ExamTableGroupBConst";

const ExamsTabGroupB: React.FC = () => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>("");
    const [filterReviewCondition, setFilterReviewCondition] = useState<filterOption>("");
    const [filterStateCondition, setFilterStateCondition] = useState<filterOption>("");
    const [applyFilter, setApplyFilter] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<FormInput>();
    
    const onSubmit = (data: FormInput) : void => {
      setInputValue(data.folioSearch);
      setApplyFilter(!applyFilter);
    };
  
    const handleChangeReview = (event: SelectChangeEvent) => {
      setFilterReviewCondition(event.target.value as filterOption);
    };

    const handleChangeState = (event: SelectChangeEvent) => {
      setFilterStateCondition(event.target.value as filterOption);
    };

    const handleApplyButton = () => {
      setApplyFilter(!applyFilter);
    }

    const SwitchesGroup = () => {
      return (
        <Grid container display={"flex"} justifyContent={"space-around"}>
          <Grid item xs={2} sm={2} md={2} lg={2} paddingY={"2%"}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Revisión</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterReviewCondition}
              label="Revisión"
              onChange={handleChangeReview}
              >
                <MenuItem value={""}>No aplicar</MenuItem>
                <MenuItem value={"true"}>Revisado</MenuItem>
                <MenuItem value={"false"}>No revisado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} paddingY={"2%"}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Estado</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterStateCondition}
              label="Revisión"
              onChange={handleChangeState}
              >
                <MenuItem value={""}>No aplicar</MenuItem>
                <MenuItem value={"true"}>Aceptados</MenuItem>
                <MenuItem value={"false"}>Rechazados</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} paddingY={"2%"}>
            <Button
              color="primary"
              variant="contained"
              sx={{ color: "#fff" }}
              onClick={handleApplyButton}
            >
              <Typography fontSize={'120%'} color={'#fff'}>
              Aplicar filtros
              </Typography>
            </Button>
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
              <ExamTableGroupB 
              applyFilter={applyFilter} 
              filterStateCondition={filterStateCondition} 
              filterReviewCondition={filterReviewCondition} 
              filterId={inputValue}  
              />
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

export default ExamsTabGroupB;
