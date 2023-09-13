import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { ExamsApi } from '@/api/exams';

import { Derivation, Exam, RejectionReason } from '@/ts/interfaces/exam';
import { ExamContextProps, ExamProviderProps } from '@/ts/types/examContext';

const ExamContext = createContext<ExamContextProps | null>(null);

function UseExam() {
  const context = useContext(ExamContext);
  if (!context) throw new Error('UseExamContext must be used within an ExamProvider');
  return context;
}

function ExamProvider({ children, examId }: ExamProviderProps) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [status, setStatus] = useState<boolean | null>(null);
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [rejectionReason, setRejectionReason] = useState<RejectionReason | null>(null);
  const [derivation, setDerivation] = useState<Derivation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getExam = useCallback(async () => {
    try {
      const examData = await ExamsApi.getExamById(examId);
      const exam = examData.data;
      setExam({
        ...exam,
        status: status,
        accepted: accepted,
        rejectionReason: rejectionReason,
        derivation: derivation,
      });
      setStatus(exam.status);
      setAccepted(exam.accepted);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [examId, status, accepted, rejectionReason, derivation]);

  useEffect(() => {
    getExam();
  }, [getExam]);

  return (
    <ExamContext.Provider value={{ exam, setStatus, setAccepted, setRejectionReason, setDerivation, isLoading }}>
      {children}
    </ExamContext.Provider>
  );
}

export { ExamProvider, UseExam as useExam };
