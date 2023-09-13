import { useParams } from 'react-router-dom';

import ExamViewLayout from '@/components/examLayout/examViewLayout';
import { useAuth } from '@/hooks/AuthContext';
import { ExamProvider } from '@/hooks/ExamContext';

import { Box } from '@mui/material';

function ExamView() {
  const { state } = useAuth();
  const { idExam } = useParams<{ idExam: string }>();
  if (state === 'authenticated')
    return (
      <>
        <ExamProvider examId={Number(idExam)}>
          <Box sx={{ width: '100%' }}>
            <ExamViewLayout />
          </Box>
        </ExamProvider>
      </>
    );
  return <></>;
}

export default ExamView;
