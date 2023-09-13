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

interface DiagnosticSistemed2 {
  ID: number;
  METRIC: number;
}

interface FiducialPoints {
  p: number;
  q: number;
  r: number;
  s: number;
  stFlag: number;
  t: number;
  r2: number;
  fc: number;
  rr: number;
  pq: number;
  qrs: number;
  qt: number;
  qtc: number;
  st: number;
}

export type { Derivation, DiagnosticSistemed2, Exam, ExamViewButtonsProps, FiducialPoints, RejectionReason };
