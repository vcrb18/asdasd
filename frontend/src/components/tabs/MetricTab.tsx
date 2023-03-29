import React, { useState } from "react";
import Footer from "../customComponents/Footer";
import { Box, Typography, Divider, Grid, TextField, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import MetricsTable from "../tables/MetricsTable";
import { Search } from "@mui/icons-material";
import FilterComponent from "../customComponents/FilterComponent";

import FilterListIcon from '@mui/icons-material/FilterList';

const MetricTabs = (): JSX.Element => {
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
    <Box
    mt={"10%"}>
      <Box
        mb={"3%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
        }}
      >
        <Box>
          <Typography
            paddingLeft={"3%"}
            display={"flex"}
            justifyContent={"flex-start"}
            sx={{ color: "#404040", fontSize: "4rem" }}
          >
            {t("metrics")}
          </Typography>
          <Divider variant="middle" />
          <Grid
          container
          lg={12}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          padding={5}
        >
          <Grid container lg={12} xs={12} md={12} columnSpacing={3} display={'flex'} justifyContent={'flex-end'} >
            <Grid item lg={10} md={10} xs={10} display={'flex'} justifyContent={'flex-end'}>
              <TextField size="small" id="folio-search" label={t("folioSearch")} variant="filled" />
              <IconButton type="button">
                <Search/>
              </IconButton>
            </Grid>
            <Grid item lg={2} md={2} xs={2}>
              <IconButton onClick={handleOpenFilter} sx={{color: '#000'}} >
                <FilterListIcon>{t('filter')}</FilterListIcon>
                </IconButton>
            </Grid>
          </Grid>
          <Dialog fullWidth open={openFilter} onClose={handleCloseFilter} >
            <DialogTitle>
              <Typography fontSize={'100%'}>{t('filter')}</Typography>
            </DialogTitle>
            <DialogContent >
              <FilterComponent handleSubmit={handleSubmit} filterType="metrics"/>  
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
              <MetricsTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer footerPosition={"fixed"} />
    </Box>
  );
};

export default MetricTabs;
