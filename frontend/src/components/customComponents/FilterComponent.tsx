import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import Checkbox from '@mui/joy/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import dayjs,  { Dayjs } from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemDecorator } from '@mui/joy';

type FilterComponentProps = {
    handleSubmit: () => void;
    filterType: "exams" | "metrics" | "alerts";
  };


const FilterComponent = ({handleSubmit, filterType}: FilterComponentProps) : JSX.Element => {
    const [fromValue, setFromValue] = React.useState<Dayjs | null>(dayjs());
    const [toValue, setToValue] = React.useState<Dayjs | null>(dayjs());
    const [fromDate, setFromDate] = React.useState<string>();
    const [toDate, setToDate] = React.useState<string>();
    const [metricsValue, setMetricsValue] = React.useState<string[]>([])


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
    const { t } = useTranslation();

    const metricsFilters = ["Puntos Fiduciales", "Error RR", "Error FC", "Error QT", "Error QTC", "Error ST"];

    const alertFilters = ["Bloqueo", "Infarto", "Extrasistole", "Normalidad", "Arritmia"]

    const examsStates = ["Aprobado", "Rechazado", "Indefinido"];

    const examsUrgencies = ["1", "2", "3"]

    const metricStates = ["Aceptado", "Rechazado", "Bien Aceptado", "Bien Rechazado", "Mal Aceptado", "Mal Rechazado"];

    return (
        
         <Box color={'#000'} borderRadius={'2%'} sx={{backgroundColor:'#c7dff9'}} width={'100%'}>
         
         
         {(filterType === "exams" || filterType === "alerts") &&
            (
            <>
            <Box padding={'2%'}>
             <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-evenly"}
                 alignItems={"center"}
                 rowSpacing={1}
                 marginY={'5%'}
                 width={'100%'}
                 >
                 <Grid item lg={12} md={12} xs={12}>
                     <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
                     {t('urgencyLevel')}
                     </Typography>
                 </Grid>
                 {examsUrgencies.map((urgency) => {
                        return (
                            <Grid item key={urgency}
                            >
                                <List
                                variant="outlined"
                                aria-label="Screens"
                                role="group"
                                orientation="horizontal"
                                sx={{
                                  bgcolor: 'background.body',
                                  flexGrow: 0,
                                  '--List-gap': '8px',
                                  '--List-padding': '8px',
                                  '--List-radius': '8px',
                                }}
                                >
                                <ListItem key={urgency}>
                                    <ListItemDecorator
                                        sx={{
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        borderColor: "#fff",
                                        position: 'central',

                                        ...(metricsValue.includes(urgency) && { color: 'text.primary' }),
                                        }}
                                    >
                                        {t(urgency)}
                                    </ListItemDecorator>
                                <Checkbox
                                    disableIcon
                                    overlay
                                    checked={metricsValue.includes(urgency)}
                                    color="neutral"
                                    variant={metricsValue.includes(urgency) ? 'outlined' : 'plain'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.checked) {
                                            setMetricsValue((val) => [ ... val, urgency ]);
                                        }
                                        else {
                                            setMetricsValue((val) => val.filter((text) => text!== urgency))
                                        }
                                    }}
                                    slotProps={{
                                        action: ({checked}) => ({
                                            sx: {
                                                bgcolor: checked ? 'background.level1' : 'transparent',
                                                boxShadow: checked ? 'sm' : 'none',
                                            }
                                        })
                                    }}
                                />
                            </ListItem>
                            </List>
                            </Grid>
                    )}
                    )}
             </Grid>
             <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-evenly"}
                 rowSpacing={1}
                 alignItems={"center"}
                 >
                 <Grid item lg={12} md={12} xs={12}>
                     <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
                     {t('state').concat(':')}
                     </Typography>
                 </Grid>
                 {examsStates.map((state) => {
                        return (
                            <Grid item key={state}
                            >
                                <List
                                variant="outlined"
                                aria-label="Screens"
                                role="group"
                                orientation="horizontal"
                                sx={{
                                  bgcolor: 'background.body',
                                  flexGrow: 0,
                                  '--List-gap': '8px',
                                  '--List-padding': '8px',
                                  '--List-radius': '8px',
                                }}
                                >
                                <ListItem key={state}>
                                    <ListItemDecorator
                                        sx={{
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        borderColor: "#fff",

                                        ...(metricsValue.includes(state) && { color: 'text.primary' }),
                                        }}
                                    >
                                        {t(state)}
                                    </ListItemDecorator>
                                <Checkbox
                                    disableIcon
                                    overlay
                                    checked={metricsValue.includes(state)}
                                    color="neutral"
                                    variant={metricsValue.includes(state) ? 'outlined' : 'plain'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.checked) {
                                            setMetricsValue((val) => [ ... val, state ]);
                                        }
                                        else {
                                            setMetricsValue((val) => val.filter((text) => text!== state))
                                        }
                                    }}
                                    slotProps={{
                                        action: ({checked}) => ({
                                            sx: {
                                                bgcolor: checked ? 'background.level1' : 'transparent',
                                                boxShadow: checked ? 'sm' : 'none',
                                            }
                                        })
                                    }}
                                />
                            </ListItem>
                            </List>
                            </Grid>
                    )}
                    )}
                </Grid>
                {(filterType === 'alerts') &&(
                <Grid
                 container
                 display={"flex"}
                 justifyContent={"space-evenly"}
                 alignItems={"center"}
                 marginY={'5%'}
                 columnSpacing={1}
                 rowSpacing={2}
                 >
                 <Grid item lg={12} md={12} xs={12}>
                     <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
                     {t('patologies').concat(': ')}
                     </Typography>
                 </Grid>
                 {alertFilters.map((alert) => {
                        return (
                            <Grid item key={alert}
                            >
                                <List
                                variant="outlined"
                                aria-label="Screens"
                                role="group"
                                orientation="horizontal"
                                sx={{
                                  bgcolor: 'background.body',
                                  flexGrow: 0,
                                  '--List-gap': '8px',
                                  '--List-padding': '8px',
                                  '--List-radius': '8px',
                                }}
                                >
                                <ListItem key={alert}>
                                    <ListItemDecorator
                                        sx={{
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        borderColor: "#fff",

                                        ...(metricsValue.includes(alert) && { color: 'text.primary' }),
                                        }}
                                    >
                                        {t(alert)}
                                    </ListItemDecorator>
                                <Checkbox
                                    disableIcon
                                    overlay
                                    checked={metricsValue.includes(alert)}
                                    color="neutral"
                                    variant={metricsValue.includes(alert) ? 'outlined' : 'plain'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.checked) {
                                            setMetricsValue((val) => [ ... val, alert ]);
                                        }
                                        else {
                                            setMetricsValue((val) => val.filter((text) => text!== alert))
                                        }
                                    }}
                                    slotProps={{
                                        action: ({checked}) => ({
                                            sx: {
                                                bgcolor: checked ? 'background.level1' : 'transparent',
                                                boxShadow: checked ? 'sm' : 'none',
                                            }
                                        })
                                    }}
                                />
                            </ListItem>
                            </List>
                            </Grid>
                    )}
                    )}
                </Grid>
)}
         </Box>
    <Box display={'flex'} flexDirection={'column'} alignItems={'space-around'} mt={'3%'} justifyContent={'space-around'} >
             <Box margin={'2%'} >
             <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleFromCalendarOpen} variant='contained' size='large'>{t('from')}</Button>
                     <Typography marginRight={'2%'}>{fromDate}</Typography>
                 </Box>
             </Paper>
             </Box>
         <Dialog maxWidth={false} open={openFromCalendar} onClose={handleFromCalendarClose}>
             <DialogTitle title={t("from")}></DialogTitle>
             <DialogContent>
             <Box marginY={'2%'}>
                     <Typography align='left' fontSize={'60%'}>{t('from')}</Typography>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DateCalendar 
                         value={fromValue}
                         onChange={handleFromChangeValue}
                         />
                     </LocalizationProvider>
                 </Box>
             </DialogContent>
             <DialogActions>
                 <Button onClick={handleFromCalendarClose}>{t('cancel')}</Button>
                 <Button
                     onClick={handleCalendarSubmit}
                     variant="contained"
                     color="error"
                 >
                    {t('add')}
                 </Button>
             </DialogActions>
         </Dialog>
         <Box margin={'2%'}>
         <Paper>
                 <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                     <Button onClick={handleToCalendarOpen} variant='contained' size='large'>{t('to')}</Button>
                     <Typography marginRight={'2%'}>{toDate}</Typography>
                 </Box>
             </Paper>
         </Box>

         <Dialog maxWidth={false} open={openToCalendar} onClose={handleToCalendarClose}>
             <DialogTitle title={t("to")}></DialogTitle>
             <DialogContent>
             <Box marginY={'2%'}>
                     <Typography align='left' fontSize={'60%'}>{t('to')}</Typography>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DateCalendar 
                         value={toValue}
                         onChange={handleToChangeValue}
                         />
                     </LocalizationProvider>
                 </Box>
             </DialogContent>
             <DialogActions>
                 <Button onClick={handleToCalendarClose}>{t('cancel')}</Button>
                 <Button
                     onClick={handleCalendarSubmit}
                     variant="contained"
                     color="error"
                 >
                    {t('add')}
                 </Button>
             </DialogActions>
         </Dialog>
     </Box>
     <Box padding={'2%'}>
     <Button fullWidth variant='contained' onClick={handleSubmit}>{t('applyFilter')}</Button>
     </Box>
     </>
     )}
     {(filterType === "metrics") &&
     (
        <>
            <Box padding={'2%'}>
                <Grid
                container
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                rowSpacing={2}
                marginY={'5%'}
                width={'100%'}
                >
                    <Grid container
                        display={"flex"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        rowSpacing={2}
                     >
                        <Grid item  lg={12} md={12} xs={12}>
                            <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
                            {t('state').concat(':')}
                            </Typography>
                        </Grid>
                        {metricStates.map((state) => {
                        return (
                            <Grid item key={state}
                            >
                                <List
                                variant="outlined"
                                aria-label="Screens"
                                role="group"
                                orientation="horizontal"
                                sx={{
                                  bgcolor: 'background.body',
                                  flexGrow: 0,
                                  '--List-gap': '8px',
                                  '--List-padding': '8px',
                                  '--List-radius': '8px',
                                }}
                                >
                                <ListItem key={state}>
                                    <ListItemDecorator
                                        sx={{
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        borderColor: "#fff",

                                        ...(metricsValue.includes(state) && { color: 'text.primary' }),
                                        }}
                                    >
                                        {t(state)}
                                    </ListItemDecorator>
                                <Checkbox
                                    disableIcon
                                    overlay
                                    checked={metricsValue.includes(state)}
                                    color="neutral"
                                    variant={metricsValue.includes(state) ? 'outlined' : 'plain'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.checked) {
                                            setMetricsValue((val) => [ ... val, state ]);
                                        }
                                        else {
                                            setMetricsValue((val) => val.filter((text) => text!== state))
                                        }
                                    }}
                                    slotProps={{
                                        action: ({checked}) => ({
                                            sx: {
                                                bgcolor: checked ? 'background.level1' : 'transparent',
                                                boxShadow: checked ? 'sm' : 'none',
                                            }
                                        })
                                    }}
                                />
                            </ListItem>
                            </List>
                            </Grid>
                    )}
                    )}
                        
                    </Grid>
                    <Grid item  lg={12} md={12} xs={12}>
                            <Typography fontSize={"100%"} sx={{ color: "#000000" }}>
                            {t('otherFilters').concat(':')}
                            </Typography>
                        </Grid>

                    {metricsFilters.map((metric) => {
                        return (
                            <Grid item key={metric}
                            >
                                <List
                                variant="outlined"
                                aria-label="Screens"
                                role="group"
                                orientation="horizontal"
                                sx={{
                                  bgcolor: 'background.body',
                                  flexGrow: 0,
                                  '--List-gap': '8px',
                                  '--List-padding': '8px',
                                  '--List-radius': '8px',
                                }}
                                >
                                <ListItem key={metric}>
                                    <ListItemDecorator
                                        sx={{
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        borderColor: "#fff",

                                        ...(metricsValue.includes(metric) && { color: 'text.primary' }),
                                        }}
                                    >
                                        {t(metric)}
                                    </ListItemDecorator>
                                <Checkbox
                                    disableIcon
                                    overlay
                                    checked={metricsValue.includes(metric)}
                                    color="neutral"
                                    variant={metricsValue.includes(metric) ? 'outlined' : 'plain'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.checked) {
                                            setMetricsValue((val) => [ ... val, metric ]);
                                        }
                                        else {
                                            setMetricsValue((val) => val.filter((text) => text!== metric))
                                        }
                                    }}
                                    slotProps={{
                                        action: ({checked}) => ({
                                            sx: {
                                                bgcolor: checked ? 'background.level1' : 'transparent',
                                                boxShadow: checked ? 'sm' : 'none',
                                            }
                                        })
                                    }}
                                />
                            </ListItem>
                            </List>
                            </Grid>
                    )}
                    )}
                </Grid>
            </Box>    
        </>
     )
     }
     </Box>
      );
    }

export default FilterComponent;
