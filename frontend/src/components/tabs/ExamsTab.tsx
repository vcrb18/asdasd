import React, { useState } from "react";
import { Box, Typography, Divider, Grid, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExamTable from "../tables/ExamTable";
import { useTranslation } from "react-i18next";
import FilterComponent from "../customComponents/FilterComponent";

const ExamsTab = (): JSX.Element => {
  const { t } = useTranslation();

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  
  const handleOpenFilter = (): void => {
    setOpenFilter(true);
  };
  const handleCloseFilter= (): void => {
    setOpenFilter(false);
  };

  const handleSubmit = (): void => {
    setOpenFilter(false);
  };

  return (
    <>
      <Box
        mt={"4%"}
        mb={"3%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        <Typography
          paddingLeft={"3%"}
          display={"flex"}
          justifyContent={"flex-start"}
          sx={{ color: "#404040", fontSize: "4rem" }}
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
          <Grid container lg={12} xs={12} md={12} display={'flex'} justifyContent={'flex-end'} >
            <Button onClick={handleOpenFilter} sx={{color: '#000'}} >Filtros</Button>
          </Grid>
          <Dialog fullWidth open={openFilter} onClose={handleCloseFilter} >
            <DialogTitle>
              <Typography fontSize={'100%'}>Filtros</Typography>
            </DialogTitle>
            <DialogContent >
              <FilterComponent handleSubmit={handleSubmit}/>  
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
            <ExamTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExamsTab;
