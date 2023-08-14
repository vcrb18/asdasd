import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import Header from "../customComponents/Header";
import MedicalCenters from "../admin/MedicalCenters";

import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";

import IdAIApplication from "../admin/IdAIApplication";
import { AdminViewBoxStyle } from "../../utils/AdminViewConst";

function AdminView() {
  const { t } = useTranslation()

  return (
    <>
      <Header
        tabs={mainMenuPageButtons}
        buttons={mainMenuHeaderButtons}
        headerPositionLg="sticky"
        headerPositionMd="sticky"
        headerPositionXs="sticky"
        onTabValueChange={(index: number) => {}}
      />
      <Typography
        display={"flex"}
        justifyContent={"center"}
        sx={{ color: "#6fb6c1", fontSize: "4rem", fontWeight: "bold" }}
      >
        {t("admin")}
      </Typography>

      <Box sx={AdminViewBoxStyle}>
          <MedicalCenters/>
      </Box>

      <Box  sx={AdminViewBoxStyle}>
        <IdAIApplication/>
      </Box>
      
    </>
  );
}

export default AdminView;
