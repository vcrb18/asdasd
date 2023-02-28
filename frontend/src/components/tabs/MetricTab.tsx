import React from "react";
import Footer from "../customComponents/Footer";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import MetricsTable from "../customComponents/MetricsTable";


const MetricTabs= (): JSX.Element => {
  const { t } = useTranslation();

  // const handleOnTabValueChange = (index: number): void => {
  //   setTabIndex(index);
  // };
  return (
    <>
      <Box
        mt={"10%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ 
          width: "100%",
        }}
      >
          <Box>
            <Typography
              paddingLeft={'3%'}
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
                <Grid
                item
                xs={12}
                md={12}
                display={"flex"}
                justifyContent={"center"}
                >
                <MetricsTable />
            </Grid>
            </Grid>
          </Box>
      </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default MetricTabs;
