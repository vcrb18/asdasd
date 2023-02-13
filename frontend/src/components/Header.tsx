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
import EngineeringIcon from '@mui/icons-material/Engineering'
import '../styles/Header.css'
import DrawerComp from '../components/DrawerComp'

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

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#bababa' }}>
        <Toolbar>

          <EngineeringIcon/>
            { isMatch
              ? (
                <>
                  {/* <Typography sx={{ fontSize: '1.2rem', paddingLeft: '10%' }}> */}
                  <Typography className="ecg-title">
                    Análisis de electrocardiogramas con IA
                  </Typography>
                  <DrawerComp tabs={tabs} buttons={buttons}/>
                </>
                )
              : (
                <>
                {/* <Typography sx={{ fontSize: '1.2rem', paddingLeft: '10%' }}> */}
                <Typography className="ecg-title">
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

          {(buttons != null) && buttons.length > 0
            ? (
                buttons.map((button, index) => (
              <Button color='secondary' key={index} sx={index === 0 ? { marginLeft: 'auto' } : index === 1 ? { marginLeft: '1%' } : {}} variant='contained'>{button.label}</Button>
                ))
              )
            : null}
                </>
                )
              }

        </Toolbar>

      </AppBar>
    </React.Fragment>
  )
}

export default Header
