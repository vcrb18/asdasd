import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography, Divider, Grid } from "@mui/material";
import ExamTable from "../customComponents/ExamTable";
import { useTranslation } from "react-i18next";

interface ExamsViewProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const ExamsView: React.FC<ExamsViewProps> = ({ buttons, tabs }) => {
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
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
          alignItems: "flex-start",
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
              {t("examinations")}
            </Typography>
            <Divider variant="middle" />
            <Grid
              container
              lg={12}
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              padding={5}
            >
              <Grid item xs={0} md={2} lg={2}>
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: '4px'
                  }}
                >
                  <Typography
                    display={"flex"}
                    justifyContent={"flex-start"}
                    variant="h3"
                    sx={{ color: "#404040", fontSize: "1.5rem" }}
                  >
                    {t("filter")}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={10}
                lg={10}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <ExamTable />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default ExamsView;
