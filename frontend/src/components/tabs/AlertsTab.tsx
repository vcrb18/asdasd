import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import AlertTable from "../customComponents/AlertsTable";

interface AlertTabProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const AlertTab: React.FC<AlertTabProps> = ({ buttons, tabs }) => {
  const { t } = useTranslation();
  const [tabIndex] = useState<number>(0);

  // const handleOnTabValueChange = (index: number): void => {
  //   setTabIndex(index);
  // };
  return (
    <>
      <Header
        tabs={tabs}
        buttons={buttons}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
        }}
      />
      <Box
        mt={"10%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: 2,
          width: "100%",
        }}
      >
        {tabIndex === 0 && (
          <Box>
            <Typography
              paddingLeft={2}
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
        )}
      </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default AlertTab;
