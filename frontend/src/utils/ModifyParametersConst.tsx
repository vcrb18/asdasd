import { Dispatch, SetStateAction } from "react";

export interface NormalThresholdMarker {
    fiducialPoint: string;
    measurementUnit: string;
    lowerLimit: string;
    upperLimit: string;
}
export interface DiagnosticType {
    diagnosticId: number;
    diagnostic: string;
    order: number;
    threshold: number;
}
export interface DiagnosticsRowProps {
    selectedDiagnostic: DiagnosticType,
    handleDeleteSelectedDiagnostics: (selectedDiagnostics: DiagnosticType) => void
}

export interface AcceptanceThreshold {
    name: string;
    threshold: number;
}

export interface ChangeParametersAlertProps{
    openSnackBar: boolean;
    setOpenSnackBar: Dispatch<SetStateAction<boolean>>
}