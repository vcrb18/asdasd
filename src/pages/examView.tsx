import { useParams } from 'react-router-dom';

import Footer from '@/components/landing/Footer';
import ResponsiveAppBar from '@/components/landing/ResponsiveAppBar';
import { useAuth } from '@/hooks/AuthContext';
import { ExamProvider } from '@/hooks/ExamContext';

import { Box } from '@mui/material';

const ExamView = () => {
  const { state } = useAuth();
  const { idExam } = useParams<{ idExam: string }>();
  if (state === 'authenticated')
    return (
      <>
        <ExamProvider examId={Number(idExam)}>
          <ResponsiveAppBar />
          <Box sx={{ width: '100%' }}></Box>
          <Footer />
        </ExamProvider>
      </>
    );
  return <></>;
};

export default ExamView;
