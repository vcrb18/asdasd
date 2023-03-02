import { Box } from '@mui/material'
import React from 'react'
import PredictionBox from '../customComponents/PredictionBox'
import AnalisisBox from '../customComponents/AnalisisBox'
import DiagnosisComponent from '../customComponents/DiagnosisComponent'

export default function ExamsView() {
  return (
    <>
    <Box>
        <Box display={'flex'} flexDirection={'column'}>
            <AnalisisBox/>
            <DiagnosisComponent/>
        </Box>
        <PredictionBox/>
    </Box>
    </>
  )
}
