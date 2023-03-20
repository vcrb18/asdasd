import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import ExamTable from "../tables/ExamTable";
import { useTranslation } from "react-i18next";

const ExamsTab = (): JSX.Element => {
  const { t } = useTranslation();

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
          <Grid item lg={2} xs={0} md={1}>
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography
                display={"flex"}
                justifyContent={"flex-start"}
                sx={{ color: "#404040", fontSize: "1.5rem" }}
              >
                {t("filter")}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            lg={10}
            xs={12}
            md={11}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <ExamTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExamsTab;
