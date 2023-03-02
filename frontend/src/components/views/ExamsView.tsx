import { Box, Paper } from '@mui/material'
import React from 'react'
import PredictionBox from '../customComponents/PredictionBox'
import AnalisisBox from '../customComponents/AnalisisBox'
import Header from '../customComponents/Header'
import Footer from '../customComponents/Footer'

interface ExamsViewProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const ExamsView: React.FC<ExamsViewProps> = ({buttons, tabs}): JSX.Element => {

  return (
    <>
    <Header
        tabs={tabs}
        buttons={buttons}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
        }}/>
    <Box>
      <Box display={'flex'} flexDirection={'row'} width={'100%'}>
        
      </Box>
    <Paper>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'column'} width={'50%'}>
            <AnalisisBox/>
          </Box>
          <Box display={'flex'} flexDirection={'column'} width={'50%'}>
            <PredictionBox/>
          </Box>
      </Box>
    </Paper>
    </Box>
    <Footer footerPosition={"fixed"} />
    </>
  )
}

export default ExamsView;