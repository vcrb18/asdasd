import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getNormalThresholdMarkers, updateNormalThresholdMarkers } from "../../service/user.service";
import { useTranslation } from "react-i18next";
import { NormalThresholdMarker } from "../../utils/ModifyParametersConst";

function FiducialPointsTable() { 

    const { t } = useTranslation();

    const [normalThresholdMarkers, SetNormalThresholdMarkers] = useState<NormalThresholdMarker[]>([]);
    const [normalThresholdMarkersToChange, SetNormalThresholdMarkersToChange] = useState<NormalThresholdMarker[]>([]);

    useEffect(() => {
        getNormalThresholdMarkers().then((response) => {
            SetNormalThresholdMarkers(response.data);
            SetNormalThresholdMarkersToChange(response.data);
        });
    }, []);

    const handleLimitChange = (index:number, value: string, limit: string) => {
        const newValue = value === '' ? 0 : parseFloat(value);
        const updatedValues = [...normalThresholdMarkersToChange];
        updatedValues[index] = {
            ...updatedValues[index],
            [limit]: newValue,
        };
        SetNormalThresholdMarkersToChange(updatedValues);
    };

    const handleSaveButton = () => {
        normalThresholdMarkersToChange.map(async (fp) => {
            await updateNormalThresholdMarkers(fp.fiducialPoint, fp.lowerLimit, fp.upperLimit);
        });
    };

    const handleCancelButton = () => {
        SetNormalThresholdMarkersToChange(normalThresholdMarkers);
        normalThresholdMarkers.map(async (fp) => {
            await updateNormalThresholdMarkers(fp.fiducialPoint, fp.lowerLimit, fp.upperLimit);
        });
    };
    
    const handleFiducialPointsName = (fiducialPoint: string) =>{
        if (fiducialPoint === "qtc"){
            return "QTc";
        }else{
            return (fiducialPoint).toUpperCase();
        }
    }

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
                <Typography variant="h6" color={"black"} fontWeight={"bold"}>{t("fiducialPoints")}</Typography>
            </Grid>

            <Grid item xs={4} />
            <Grid item xs={4}>
                <Typography>{t("lowerLimit")}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>{t("upperLimit")}</Typography>
            </Grid>

            {normalThresholdMarkersToChange.map((fiducialPoint, index) => (
                <React.Fragment key={index}>
                    <Grid item xs={4}>
                        <Typography>{handleFiducialPointsName(fiducialPoint.fiducialPoint)} ({fiducialPoint.measurementUnit})</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                        id="folio-search"
                        variant="outlined"
                        size="small"
                        value={fiducialPoint.lowerLimit}
                        onChange={(event) => {handleLimitChange(index, event.target.value, "lowerLimit")}}
                        sx={{ width: "60%", backgroundColor:"white"}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                        id="folio-search"
                        variant="outlined"
                        size="small"
                        value={fiducialPoint.upperLimit}
                        onChange={(event) => {handleLimitChange(index, event.target.value, "upperLimit")}}
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
        </Grid>
    );
}

export default FiducialPointsTable;