interface Exam {
  examId: number;
  patientId: number;
  createdAt: string;
  status: boolean | null;
  accepted: boolean | null;
  urgency: number;
  results: string;
  operatorReview: boolean;
  operatorAccept: boolean | null;
  rejectionId: number;
  rejectedDerivation: string;
  rejectionReason: RejectionReason | null;
  derivation: Derivation | null;
  accuracy: number;
  remainingTime: string | null;
}

interface RejectionReason {
  id: number;
  reason: string;
}

interface Derivation {
  id: number;
  derivation: string;
}

interface ExamViewButtonsProps {
  buttonText: string;
}

export type { Derivation, Exam, ExamViewButtonsProps, RejectionReason };
