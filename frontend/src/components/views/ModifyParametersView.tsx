import { Button, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import { mainMenuHeaderButtons, mainMenuPageButtons } from "../../utils/routingPropConsts";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import FiducialPointsTable from "../modifyParameters/fiducialPointsTable";
import AcceptanceLevelTable from "../modifyParameters/acceptanceLevelTable";
import DiagnosticsTable from "../modifyParameters/diagnosticsTable";
import { NavigateFunction, useNavigate } from "react-router-dom";


function ModifyParametersView() {
    
    const navigate: NavigateFunction = useNavigate();

    const handleGoBack = (): void => {

        navigate("/admin");
      };

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
        
       <Grid container spacing={2}>
            <Grid item xs={12} marginLeft={"5%"} width={"80%"} display={"flex"} justifyContent={"flex-start"}>
                <Button 
                    variant="contained" 
                    onClick={handleGoBack}
                    sx={{
                        backgroundColor: "#007088",
                        color: "#000000",
                        width: "auto",
                    }}>
                    <Typography color={"#ffffff"}>{t("goBack")}</Typography>
                </Button>
            </Grid>
            <Grid item xs={6} borderRadius={4}>
                <FiducialPointsTable/>
                <AcceptanceLevelTable/>
            </Grid>
            <Grid item xs={6}>
                <DiagnosticsTable/>
            </Grid>

        </Grid>
    </>
  );
}

export default ModifyParametersView;
