import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs,  { Dayjs } from 'dayjs';
import React from 'react';


const FilterComponent = () => {
    const [fromValue, setFromValue] = React.useState<Dayjs | null>(dayjs());
    const [toValue, setToValue] = React.useState<Dayjs | null>(dayjs());
    const [fromDate, setFromDate] = React.useState<string>();
    const [toDate, setToDate] = React.useState<string>();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const handleFromDate = (newValue: Dayjs | null ): void => {
        const value = newValue? newValue.toISOString().split('T') : '';
        setFromDate(value[0]);
    };

    const handleToDate = (newValue: Dayjs | null ): void => {
        const value = newValue? newValue.toISOString().split('T') : '';
        setToDate(value[0]);
    };

    const handleFromChangeValue = (newValue: Dayjs | null ) => 
    {
        handleFromDate(newValue);
        setFromValue(newValue);
    };

    const handleToChangeValue = (newValue: Dayjs | null ) => {
        handleToDate(newValue);
        setToValue(newValue)
    };
    const [openFromCalendar, setOpenFromCalendar] = React.useState(false);

    const [openToCalendar, setOpenToCalendar] = React.useState(false);


    const handleFromCalendarOpen = (): void => {
        setOpenFromCalendar(true);
    };
    const handleFromCalendarClose = () : void => {
        setOpenFromCalendar(false);
    };

    const handleToCalendarOpen = (): void => {
        setOpenToCalendar(true);
    };
    const handleToCalendarClose = () : void => {
        setOpenToCalendar(false);
    };

    const handleCalendarSubmit = () : void => {
        // TODO: Confirmar que la fecha está correctamente ingresada
        setOpenFromCalendar(false);
        setOpenToCalendar(false);
    };

    const handleFilterApply = () : void => {

    };
    

    return (
        <>
        {isMatch? (
         <Box>

         </Box>
         
         ): (
         <Box color={'#000'} borderRadius={'2%'} sx={{backgroundColor:'#c7dff9'}} padding={'1.5%'} width={'100%'}>

         <Box >
         <Typography fontSize={'100%'}>Filtros</Typography>

             <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-between"}
                 padding={"1%"}
                 marginY={'2%'}
                 >
                 <Grid item>
                     <Typography fontSize={"75%"} sx={{ color: "#000000" }}>
                     Urgencia
                     </Typography>
                 </Grid>
                 <Grid item>
                     <Select
                     size="small"
                     sx={{
                         marginLeft: "1%",
                         backgroundColor: "#006a6b",
                         color: "#fff",
                         borderRadius: 1,
                     }}
                     >
                     <MenuItem value="urgencia">urgencia</MenuItem>
                     </Select>
                 </Grid>
             </Grid>
             <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-between"}
                 padding={"1%"}
                 >
                 <Grid item>
                     <Typography fontSize={"75%"} sx={{ color: "#000000" }}>
                     Estado
                     </Typography>
                 </Grid>
                 <Grid item>
                     <Select
                     size="small"
                     sx={{
                         marginLeft: "1%",
                         backgroundColor: "#006a6b",
                         color: "#fff",
                         borderRadius: 1,
                     }}
                     >
                     <MenuItem value="estado">estado</MenuItem>
                     </Select>
                 </Grid>
             </Grid>
         </Box>
         <Box display={'flex'} flexDirection={'column'} alignItems={'space-around'} mt={'3%'} justifyContent={'space-around'} >
             <Box marginY={'2%'}>
             <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleFromCalendarOpen} size='large'>Desde</Button>
                     <Typography marginRight={'2%'}>{fromDate}</Typography>
                 </Box>
             </Paper>
             </Box>
         <Dialog open={openFromCalendar} onClose={handleFromCalendarClose}>
             <DialogTitle title="Desde:"></DialogTitle>
             <DialogContent>
             <Box marginY={'2%'}>
                     <Typography align='left' fontSize={'60%'}>Desde</Typography>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DateCalendar 
                         value={fromValue}
                         onChange={handleFromChangeValue}
                         />
                     </LocalizationProvider>
                 </Box>
             </DialogContent>
             <DialogActions>
                 <Button onClick={handleFromCalendarClose}>Cancel</Button>
                 <Button
                     onClick={handleCalendarSubmit}
                     variant="contained"
                     color="error"
                 >
                     Submit
                 </Button>
             </DialogActions>
         </Dialog>
         <Box marginY={'2%'}>
         <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleToCalendarOpen} size='large'>Hasta</Button>
                     <Typography marginRight={'2%'}>{toDate}</Typography>
                 </Box>
             </Paper>
         </Box>

         <Dialog open={openToCalendar} onClose={handleToCalendarClose}>
             <DialogTitle title="Desde:"></DialogTitle>
             <DialogContent>
             <Box marginY={'2%'}>
                     <Typography align='left' fontSize={'60%'}>Hasta</Typography>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DateCalendar 
                         value={toValue}
                         onChange={handleToChangeValue}
                         />
                     </LocalizationProvider>
                 </Box>
             </DialogContent>
             <DialogActions>
                 <Button onClick={handleToCalendarClose}>Cancel</Button>
                 <Button
                     onClick={handleCalendarSubmit}
                     variant="contained"
                     color="error"
                 >
                     Submit
                 </Button>
             </DialogActions>
         </Dialog>
     </Box>
     <Button onClick={handleFilterApply} sx={{position: 'end'}}>Aplicar Filtros</Button>
     </Box>
     )}
        </>
      );
    }

export default FilterComponent;
