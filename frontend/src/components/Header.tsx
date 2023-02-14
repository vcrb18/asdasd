import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import EngineeringIcon from '@mui/icons-material/Engineering'
import '../styles/Header.css'
import DrawerComp from '../components/DrawerComp'
// import Image from 'mui-image'

interface TabProps {
  label: string
}

interface ButtonProps {
  label: string
}

interface HeaderProps {
  tabs: TabProps[]
  buttons: ButtonProps[]
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons }) => {
  const [value, setValue] = useState()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: '#4d4d4d'
      }
    }
  })

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#bababa' }}>
        <Toolbar>

          <EngineeringIcon/>
          {/* <Image class='ecg-image' src='../media/Logo_PSINet.jpeg'> */}
            { isMatch
              ? (
                <>
                  <Typography sx={{ fontSize: '1.2rem' }} className="ecg-title">
                    Análisis de electrocardiogramas con IA
                  </Typography>
                  <DrawerComp tabs={tabs} buttons={buttons}/>
                </>
                )
              : (
                <>
                <Typography sx={{ fontSize: '1.2rem' }} className="ecg-title">
                    Análisis de electrocardiogramas con IA
                  </Typography>
                <Tabs
                sx={{ marginLeft: 'auto' }}
            textColor='inherit'
            className='tabs-text'
            value={value}
            onChange={(e, value) => { setValue(value) }}

          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>

          <ThemeProvider theme={buttonsTheme}>
          {(buttons != null) && buttons.length > 0
            ? (
                buttons.map((button, index) => (
              <Button color='primary' key={index} sx={index === 0 ? { marginLeft: 'auto' } : index === 1 ? { marginLeft: '1%' } : {}} variant='contained'>{button.label}</Button>
                ))
              )
            : null}
          </ThemeProvider>
                </>
                )
              }

        </Toolbar>

      </AppBar>
    </React.Fragment>
  )
}

export default Header
