import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import AlertTable from "../customComponents/AlertsTable";


const AlertsTab = () : JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        mt={"4%"}
        mb={'3%'}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
          <Box>
            <Typography
              paddingLeft={'3%'}
              display={"flex"}
              justifyContent={"flex-start"}
              sx={{ color: "#404040", fontSize: "4rem" }}
            >
              {t("alerts")}
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
                <AlertTable />
            </Grid>
            </Grid>
          </Box>
      </Box>
    </>
  );
};

export default AlertsTab;
