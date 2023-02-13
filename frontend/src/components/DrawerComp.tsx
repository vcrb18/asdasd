import React, { useState } from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface DrawerTabItems {
  label: string
}

interface DrawerButtonItems {
  label: string
}

interface DrawerCompProps {
  tabs: DrawerTabItems[]
  buttons: DrawerButtonItems[]
}

const DrawerComp: React.FC<DrawerCompProps> = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const tabsAndButtons = props.tabs.concat(props.buttons)

  return (
    <React.Fragment>
        <Drawer open={openDrawer}
            onClose={() => { setOpenDrawer(false) }}
        >
            <List>
                {
                    tabsAndButtons.map((tab, index) => (
                        <ListItemButton onClick={() => { setOpenDrawer(false) }} key={index}>
                            <ListItemIcon>
                                <ListItemText>{tab.label}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>

                    ))
                }
            </List>
        </Drawer>
        <IconButton sx={{ color: '#e0e0e0', marginLeft: 'auto' }} onClick={() => { setOpenDrawer(!openDrawer) }}>
            <MenuIcon sx={{ marginLeft: 'auto' }} />
        </IconButton>

    </React.Fragment>
  )
}

export default DrawerComp
