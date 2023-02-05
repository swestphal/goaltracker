import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import assets from '../../assets/index'
import { Box } from '@mui/system'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

const Sidebar = () => {
  const user = useSelector((state) => state.user.value)
  const sidebarWidth = 250
  return (<Drawer
    container={window.document.body}
    variant='permanent'
    open={true}
    sx={{
      width:sidebarWidth,
      height: '100%',
      '& > div': { borderRight: 'none'}
    }}>
    <List
      disablePadding
      sx={{
        width: sidebarWidth,
        height: '100vH',
        backgroundColor: assets.colors.secondary
      }}>
      <ListItemButton>
        <Box sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography variant='body2' fontWeight='700'>
            {user.username}
          </Typography>
          <IconButton>
            <LogoutOutlinedIcon/>
          </IconButton></Box>
      </ListItemButton>
    </List>
  </Drawer>
  )
}
 
export default Sidebar;