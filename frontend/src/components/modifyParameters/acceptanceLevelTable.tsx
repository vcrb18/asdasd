import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAcceptanceThresholds, updateAcceptanceThresholds } from "../../service/user.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { AcceptanceThreshold } from "../../utils/ModifyParametersConst";
import ChangeParametersAlert from "./changeParametersAlert";

function AcceptanceLevelTable() {
    const { t } = useTranslation();
    
    const [acceptanceThresholds, setAcceptanceThresholds] = useState<AcceptanceThreshold[]>([]);
    const [acceptanceThresholdsToChange, setAcceptanceThresholdsToChange] = useState<AcceptanceThreshold[]>([]);
    const [openSnackBarMessage, setOpenSnackBarMessage] = useState<boolean>(false);

    const handleChangeThreshold = (index:number, value: string) => {
        const newValue = Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        const updatedValues = [...acceptanceThresholdsToChange];
        updatedValues[index] = {
            ...updatedValues[index],
            ["threshold"]: newValue,
        };
        setAcceptanceThresholdsToChange(updatedValues);
    };

    const handleCancelButton = () => {
        setAcceptanceThresholdsToChange(acceptanceThresholds);
        acceptanceThresholds.map(async (acceptanceThreshold) => {
            await updateAcceptanceThresholds(acceptanceThreshold.name, acceptanceThreshold.threshold/100);
        });
    };

    const handleSaveButton = () => {
        acceptanceThresholdsToChange.map(async (acceptanceThreshold) => {
            await updateAcceptanceThresholds(acceptanceThreshold.name, acceptanceThreshold.threshold/100);
        });
        setOpenSnackBarMessage(true);
    };

    useEffect(() => {
        getAcceptanceThresholds().then((response) => {
            const acceptanceThresholds: AcceptanceThreshold[] = response.data;
            acceptanceThresholds.map((acceptanceThreshold) => {
                return acceptanceThreshold.threshold*=100;
            });
            setAcceptanceThresholds(acceptanceThresholds);
            setAcceptanceThresholdsToChange(acceptanceThresholds);
        });
    }, []);

    return(
        <Grid 
        container 
        spacing={2} 
        width={"80%"}
        mx={"5%"}
        my={"1%"} 
        borderRadius={4}
        sx={{
            backgroundColor: "#E4EDEF"
        }}
        >
            <Grid item xs={12} textAlign={"start"} marginLeft={"2%"}>
                <Typography variant="h6" color={"black"} fontWeight={"bold"}>{t("acceptanceLevel")}</Typography>
            </Grid>

            {acceptanceThresholdsToChange.map((acceptanceThreshold, index) => (
                <React.Fragment key={index}>
                    <Grid item xs={3}>
                        <Typography>{t(acceptanceThreshold.name)} (%)</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                        id="folio-search"
                        variant="outlined"
                        size="small"
                        value={acceptanceThreshold.threshold}
                        onChange={(event) => {handleChangeThreshold(index, event.target.value)}}
                        sx={{ width: "60%", backgroundColor:"white"}}
                        />
                    </Grid>
                </React.Fragment>
            ))}

            <Grid item xs={12} textAlign="right" marginBottom={"2%"}>
                <Button 
                variant="contained" 
                onClick={handleCancelButton}
                sx={{
                    backgroundColor: "#007088",
                    color: "#000000",
                    width: "auto",
                    marginX:"5%",
                    marginY:"1%"
                  }}>
                    <Typography color={"#ffffff"}>{t("revertChanges")}</Typography>
                </Button>
                <Button 
                variant="contained" 
                onClick={handleSaveButton}
                sx={{
                    backgroundColor: "#007088",
                    color: "#000000",
                    width: "auto",
                    marginX:"5%",
                    marginY:"1%"
                  }}>
                    <Typography color={"#ffffff"}>{t("applyChanges")}</Typography>
                </Button>
            </Grid>
            <ChangeParametersAlert openSnackBar={openSnackBarMessage} setOpenSnackBar={setOpenSnackBarMessage} />
        </Grid>
    );
}

export default AcceptanceLevelTable;