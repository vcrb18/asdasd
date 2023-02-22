import React, { useState } from "react";
import Header from "../components/Header";
import { Box, Typography, Divider, Grid, Paper, Avatar } from "@mui/material";
import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../utils/routingPropConsts";
import ExamTable from "./ExamTable";

interface ExamsViewProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const ExamsView: React.FC<ExamsViewProps> = ({ buttons, tabs }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOnTabValueChange = (index: number): void => {
    setTabIndex(index);
  };
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
			flexDirection={ 'row'}
			justifyContent={'space-between'}
			alignItems={'center'}
        sx={{
          padding: 2,
          width: "100%",
          backgroundColor: "#c7dff9",
        }}
      >
        {tabIndex === 0 &&(
        <Box>
          <Typography
            display={"flex"}
            justifyContent={"flex-start"}
            sx={{ color: "#404040", fontSize: "2.5rem" }}
          >
            Exámenes
          </Typography>
          <Divider variant="fullWidth" />
          <Grid
            container
            lg={12}
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            padding={5}
          >
            <Grid item lg={1} xs={0} md={1}>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                Aqui podría ir un menú de filtro
              </Box>
            </Grid>
            <Grid item lg={11} xs={12} md={11} display={"flex"} justifyContent={"flex-end"}>
                <ExamTable />
            </Grid>
          </Grid>
        </Box>
        )}
      </Box>
    </>
  );
};

export default ExamsView;
