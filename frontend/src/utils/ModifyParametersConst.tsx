export interface NormalThresholdMarker {
    fiducialPoint: string;
    measurementUnit: string;
    lowerLimit: number;
    upperLimit: number;
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