import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Projects from '@/components/landing/Projects';
import ResponsiveAppBar from '@/components/landing/ResponsiveAppBar';
import Team from '@/components/landing/Team';

import { Box, Divider } from '@mui/material';

const Landing = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ width: '100%' }}>
        <Hero />
        <Divider sx={{ my: 10 }} />
        <Projects />
        <Divider sx={{ my: 10 }} />
        <Team />
      </Box>
      <Footer />
    </>
  );
};

export default Landing;
