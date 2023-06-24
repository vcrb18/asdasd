import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getExamById } from '@/api/users.service';

import { Derivation, Exam, RejectionReason } from '@/ts/interfaces/exam';
import { ExamContextProps, ExamProviderProps } from '@/ts/types/examContext';

const ExamContext = createContext<ExamContextProps | null>(null);

function UseExam() {
  return useContext(ExamContext);
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
      const examData = await getExamById(examId);
      const exam = examData.data;
      setExam({
        id: exam.examId,
        patientId: exam.patientId,
        createdAt: exam.createdAt,
        status: status,
        accepted: accepted,
        urgency: exam.urgency,
        results: exam.results,
        operatorReview: exam.operatorReview,
        operatorAccept: exam.operatorAccept,
        rejectionId: exam.rejectionId,
        rejectedDerivation: exam.rejected_derivation, // Arreglar cuando se mergee el cambio en el back
        rejectionReason: rejectionReason,
        derivation: derivation,
        accuracy: exam.accuracy,
        remainingTime: exam.remainingTime,
      });
      setStatus(exam.status);
      setAccepted(exam.accepted);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      return <>No se pudo cargar el examen</>;
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
