export interface MedicalCenterListProps {
  activeMedicalCenters: MedicalCenter[];
  medicalCentersToAdd: MedicalCenter[];
  timeActiveLeft: number[];
  handleDeleteClick: (id: number) => void;
}

export interface AdminBoxProps {
  text: string;
}

export interface MedicalCenterSearchProps {
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  handleMedicalCentersToAdd: (medicalCenters: MedicalCenter[]) => void;
}

export interface MedicalCenter {
  organizationId: number;
  legalName: string;
  responseTime: number;
}

export interface TimerBoxProps {
  amountOfTimeActive: number;
  onAmountOfTimeActiveChange: (time: number) => void;
}
