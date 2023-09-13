import Hero from '@/components/landing/Hero';
import Projects from '@/components/landing/Projects';
import Team from '@/components/landing/Team';

import { Box, Divider } from '@mui/material';

function Landing() {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Hero />
        <Divider sx={{ my: 10 }} />
        <Projects />
        <Divider sx={{ my: 10 }} />
        <Team />
      </Box>
    </>
  );
}

export default Landing;
