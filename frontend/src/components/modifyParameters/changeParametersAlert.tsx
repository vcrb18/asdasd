import { Snackbar, Alert } from "@mui/material";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";

interface ChangeParametersAlertProps{
    openSnackBar: boolean;
    setOpenSnackBar: Dispatch<SetStateAction<boolean>>
}

function ChangeParametersAlert ({openSnackBar, setOpenSnackBar}: ChangeParametersAlertProps) {
        
    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        };

    return (
    <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
        {t("changeParametersMessage")}
        </Alert>
    </Snackbar>
    );
}

export default ChangeParametersAlert;