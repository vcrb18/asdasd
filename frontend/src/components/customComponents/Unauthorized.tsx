import { useTranslation } from "react-i18next";
import Header from "./Header";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { mainMenuPageButtons, mainMenuHeaderButtons } from "../../utils/routingPropConsts";
import Footer from "./Footer";

function Unauthorized() {
    const { t } = useTranslation();
    return(
      <>
        <Header
            tabs={mainMenuPageButtons}
            buttons={mainMenuHeaderButtons}
            headerPositionLg="sticky"
            headerPositionMd="sticky"
            headerPositionXs="sticky"
            onTabValueChange={(index: number) => {}}
        />
        <Box alignContent={"center"} alignItems={"center"} textAlign={"center"} sx={{padding:"10%"}}>
        <Typography>
            {t("unauthorized")}
        </Typography>
        <Button 
        variant="contained" 
        href="/mainmenu"
        sx={{
            backgroundColor: "#007088",
            color: "#000000",
            width: "auto",
            marginX:"5%",
            marginY:"1%"
            }}>
            <Typography color={"#ffffff"}>{t("backToMenu")}</Typography>
            </Button>
        </Box>
        <Footer
        footerPositionLg="absolute"
        footerPositionMd="absolute"
        footerPositionXs="absolute"/>
      </>
    );
}

export default Unauthorized;