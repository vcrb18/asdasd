import React, { useState } from "react";
import Footer from "../customComponents/Footer";
import Header from "../customComponents/Header";
import { mainMenuHeaderButtons, mainMenuPageButtons } from "../../utils/routingPropConsts";
import { Grid, Typography, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ExamTableGroupB from "./ExamTableGroupB";
import { filterOption, FormInput } from "../../utils/ExamTableGroupBConst";
import FiltersComponent from "./FiltersComponent";
import { FilterComponentProps } from "../../utils/FiltersConst";

const ExamsTabGroupB: React.FC = () => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>("");
    const [filterReviewCondition, setFilterReviewCondition] = useState<filterOption>("");
    const [filterStateCondition, setFilterStateCondition] = useState<filterOption>("");
    const [filterScreenshotCondition, setFilterScreenshotCondition] = useState<filterOption>("");
    const [applyFilter, setApplyFilter] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<FormInput>();
    
    const onSubmit = (data: FormInput) : void => {
      setInputValue(data.folioSearch);
      setApplyFilter(!applyFilter);
    };

    const handleApplyButton = () => {
      setApplyFilter(!applyFilter);
    }
    
    const filters: FilterComponentProps[] = [
    {
      conditionValue: filterScreenshotCondition,
      label: "filterByScreenshot",
      setCondition: setFilterScreenshotCondition,
      trueOption: "true",
      falseOption: "false",
    },]
  
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
              <ExamTableGroupB 
              applyFilter={applyFilter} 
              filterStateCondition={filterStateCondition} 
              filterReviewCondition={filterReviewCondition}
              filterScreenshotCondition={filterScreenshotCondition} 
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
