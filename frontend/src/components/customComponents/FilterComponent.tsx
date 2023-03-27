import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import dayjs,  { Dayjs } from 'dayjs';
import React from 'react';

type FilterComponentProps = {
    handleSubmit: () => void;
  };


const FilterComponent = ({handleSubmit}: FilterComponentProps) : JSX.Element => {
    const [fromValue, setFromValue] = React.useState<Dayjs | null>(dayjs());
    const [toValue, setToValue] = React.useState<Dayjs | null>(dayjs());
    const [fromDate, setFromDate] = React.useState<string>();
    const [toDate, setToDate] = React.useState<string>();


    const handleFromDate = (newValue: Dayjs | null ): void => {
        const value = newValue? newValue.toISOString().split('T') : '';
        setFromDate(value[0]);
    };

    const handleToDate = (newValue: Dayjs | null ): void => {
        const value = newValue? newValue.toISOString().split('T') : '';
        setToDate(value[0]);
    };

    const handleFromChangeValue = (newValue: Dayjs | null ): void => 
    {
        handleFromDate(newValue);
        setFromValue(newValue);
    };

    const handleToChangeValue = (newValue: Dayjs | null ): void => {
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
        handleCheckDate();
        setOpenFromCalendar(false);
        setOpenToCalendar(false);
    };

    const handleCheckDate = () : void => {
        
    };

    return (
        
         <Box color={'#000'} borderRadius={'2%'} sx={{backgroundColor:'#c7dff9'}} width={'100%'}>
         <Box padding={'2%'}>
             <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-evenly"}
                 alignItems={"center"}
                 marginY={'5%'}
                 width={'100%'}
                 >
                 <Grid item>
                     <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
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
                 justifyContent={"space-evenly"}
                 alignItems={"center"}
                 >
                 <Grid item>
                     <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
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
             <Box margin={'2%'} >
             <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleFromCalendarOpen} variant='contained' size='large'>Desde</Button>
                     <Typography marginRight={'2%'}>{fromDate}</Typography>
                 </Box>
             </Paper>
             </Box>
         <Dialog  open={openFromCalendar} onClose={handleFromCalendarClose}>
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
         <Box margin={'2%'}>
         <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleToCalendarOpen} variant='contained' size='large'>Hasta</Button>
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
     <Box padding={'2%'}>
     <Button fullWidth variant='contained' onClick={handleSubmit}>Aplicar Filtros</Button>
     </Box>

     </Box>
      );
    }

export default FilterComponent;
