import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Select, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs,  { Dayjs } from 'dayjs';
import React from 'react';


const FilterComponent = () => {
    const [fromValue, setFromValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [toValue, setToValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    
    const hanldeFromChangeValue = (newValue: Dayjs | null ) => {
        setFromValue(newValue)
    };

    const handleToChangeValue = (newValue: Dayjs | null ) => {
        setToValue(newValue)
    };
    const [checked, setChecked] = React.useState([true, false]);
    
    const handleChange = () => {

    };

    return (
        <Box color={'#000'} borderRadius={'2%'} sx={{backgroundColor:'#c7dff9'}} padding={'1.5%'}>
            <Box >
                <Grid
                    container
                    display={"flex"}
                    justifyContent={"space-between"}
                    padding={"1%"}
                    marginY={'2%'}
                    >
                    <Grid item>
                        <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
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
                        <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
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
            <Box marginY={'2%'}>
            <Typography fontSize={'80%'}>Filtros</Typography>
                <Typography align='left' fontSize={'60%'}>Desde</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                    value={fromValue}
                    onChange={hanldeFromChangeValue}
                    />
                </LocalizationProvider>
            </Box>
            <Box marginY={'2%'}>
                <Typography align='left' fontSize={'60%'}>Hasta</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                    value={toValue}
                    onChange={handleToChangeValue}
                    />
                </LocalizationProvider>
            </Box>
        </Box>

      );
    }

export default FilterComponent;
