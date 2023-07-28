import { Grid, Typography, Box, Button, Autocomplete, TextField, AutocompleteInputChangeReason } from "@mui/material";
import DiagnosisRow from "./diagnosisRow";
import { useEffect, useState } from "react";
import { getDiagnosticTypes, updateDiagnosticThreshold } from "../../service/user.service";
import { useTranslation } from "react-i18next";
import { DiagnosticType } from "../../utils/ModifyParametersConst";

function DiagnosticsTable() {

    const {t} = useTranslation();
    
    const dummyDiagnostic: DiagnosticType = {
        threshold: 0,
        diagnosticId: -1,
        diagnostic: "",
        order:-1,
      }

    const [selectedDiagnostics, setSelectedDiagnostics] = useState<DiagnosticType[]>([])
    const [diagnosticTypes, setDiagnosticTypes] = useState<DiagnosticType[]>([]);
    const [currentDiagnostic, setCurrentDiagnostic] = useState<DiagnosticType>(dummyDiagnostic);
    


    const handleDeleteSelectedDiagnostics = (diagnostic: DiagnosticType): void => {
      setSelectedDiagnostics(selectedDiagnostics.filter((i) => i?.diagnosticId !== diagnostic.diagnosticId) );

    };
    const handleAddSelectedDiagnostic = (): void => {
        const isNotDiagnosticDummy = currentDiagnostic.diagnosticId !== dummyDiagnostic.diagnosticId;
        if(isNotDiagnosticDummy){
            setSelectedDiagnostics([...selectedDiagnostics.filter( (diagnostic) => (diagnostic.diagnosticId !== currentDiagnostic.diagnosticId)), currentDiagnostic]);
        }
    }

    const handleOptionSelect = (newValue: DiagnosticType | null) => {
        newValue ? setCurrentDiagnostic(newValue) : setCurrentDiagnostic(dummyDiagnostic);
    };

    const handleThresholdChange = (newThreshold: string) => {
        const newValue = Number.isNaN(parseFloat(newThreshold)) ? 0 : parseFloat(newThreshold);
        const diagnosticModified = {
            ...currentDiagnostic,
            ['threshold']: newValue,
        }
        setCurrentDiagnostic(diagnosticModified);
    };

    const handleSaveButton = () => {
        selectedDiagnostics.map(async (diagnostic) => {
            await updateDiagnosticThreshold(diagnostic.diagnosticId, diagnostic.threshold/100);
        });
        setSelectedDiagnostics([]);
    };

    useEffect(() => {
        getDiagnosticTypes().then((response) => {
            const diagnostics: DiagnosticType[] = response.data;
            diagnostics.map((diagnostic) => {
                return diagnostic.threshold*=100;
            });
            setDiagnosticTypes(diagnostics);
        });
    }, []);

    return (
        <Grid 
        container 
        spacing={2}
        width={"90%"}
        mx={"1%"}
        my={"1%"} 
        borderRadius={4}
        sx={{
            backgroundColor: "#E4EDEF"
        }}
        > 
            <Grid item xs={12} textAlign={"start"} marginLeft={"2%"}>
                <Typography variant="h6" color={"black"} fontWeight={"bold"}>{t("diagnostics")}</Typography>
            </Grid>
    
            <Grid item xs={4} display={"flex"} justifyContent={"center"}>
                <Typography>{t("diagnostic")}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>{t("confidence")} (%)</Typography>
            </Grid>
            <Grid item xs={4} />

            <Grid item xs={4}>
                <Autocomplete
                isOptionEqualToValue={(option, value) => option.diagnostic === value.diagnostic}
                getOptionLabel={(option) => option.diagnostic}
                value={currentDiagnostic}
                onChange={(_, value) => {handleOptionSelect(value)}}
                id="select-diagnostic"
                options={diagnosticTypes}
                sx={{ width: "110%", marginLeft:"15%", backgroundColor:"white"}}
                renderInput={(params) => <TextField {...params}/>}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                id="folio-search"
                variant="outlined"
                size="medium"
                value={currentDiagnostic.threshold}
                onChange={(event) => handleThresholdChange(event.target.value)}
                sx={{ width: "60%", backgroundColor:"white", marginLeft:"20%"}}
                />
            </Grid>
            <Grid item xs={4} display={"flex"} alignItems={"center"}>
                <Button 
                variant="contained" 
                onClick={handleAddSelectedDiagnostic}
                sx={{
                    backgroundColor: "#007088",
                    color: "#000000",
                    width: "auto",
                    marginRight:"30%",
                }}>
                    <Typography color={"#ffffff"}>{t("append")}</Typography>
                </Button>
            </Grid>
    
            <Grid item xs={12} >
                <Box borderRadius={4} sx={{ height: 305, marginY:'2%', marginX:'5%' , overflowY: 'auto', overflowX:'hidden', backgroundColor:"white"}}>
                {selectedDiagnostics.map((diagnostic, index) => {
                    return (
                      <DiagnosisRow key={index} handleDeleteSelectedDiagnostics={handleDeleteSelectedDiagnostics} selectedDiagnostic={diagnostic}/>
                      );
                  })
                  }
                </Box>
            </Grid>
    
            <Grid item xs={12} textAlign="center" marginBottom={"2%"}>
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
                    <Typography color={"#ffffff"}>{t("modifyParameters")}</Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default DiagnosticsTable;