import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import xButton from "../../static/images/xButton.png"
import { DiagnosticsRowProps, DiagnosticType } from "../../utils/ModifyParametersConst";
import { useTranslation } from "react-i18next";

function DiagnosisRow(props: DiagnosticsRowProps) {

    const { t } = useTranslation();

    const diagnostic = props.selectedDiagnostic;

    const handleDeleteClick = (): void => {
        props.handleDeleteSelectedDiagnostics(props.selectedDiagnostic)
    };

    return(
        <Box display={"flex"} flexDirection={"row"} maxWidth={"100%"}
        sx={{border: 1,
            borderColor: "#E4EDEF",
            borderRadius: "1%",
        }}>
            
            <Grid container display={"flex"} marginY={"1%"} marginX={"3%"} justifyContent={"space-arround"}>
                <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={"center"}>
                    <Typography fontSize={"65%"} fontWeight={"bold"} align="left">{t(diagnostic.diagnostic)}</Typography>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={"center"}>
                    <Typography fontSize={"65%"} fontWeight={"bold"} align="left">{diagnostic.threshold}%</Typography>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={"center"}>
                    <Button
                        onClick={handleDeleteClick}
                        >
                        <Avatar src={xButton} alt={"checkVerde"} variant={"circular"}  />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DiagnosisRow;