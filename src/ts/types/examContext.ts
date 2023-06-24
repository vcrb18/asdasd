import { Derivation, Exam, RejectionReason } from '../interfaces/exam';

type ExamContextProps = {
  exam: Exam | null;
  setStatus: (params: boolean) => void;
  setAccepted: (params: boolean) => void;
  setRejectionReason: (params: RejectionReason | null) => void;
  setDerivation: (params: Derivation | null) => void;
  isLoading: boolean;
};

interface ExamProviderProps {
  children: React.ReactNode;
  examId: number;
}

export type { ExamContextProps, ExamProviderProps };
