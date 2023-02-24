import React from 'react';
import {  Typography, Grid } from "@mui/material";

export default function AnalisisBox(): JSX.Element {
  return (
    <>
    <Grid 
    container
    lg={12}
    rowSpacing={2}
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    padding={5} 
    >
        <Grid item>
            <Typography></Typography>
        </Grid>
    </Grid>
    </>
  )
}
