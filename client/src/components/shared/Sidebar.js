import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, IconButton, List, ListItem, Typography } from '@mui/material'
import assets from '../../assets/index'
import { Box } from '@mui/system'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useNavigate } from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'

const Sidebar = () => {
  const user = useSelector((state) => state.user.value)
  const boards = useSelector((state) => state.board.value)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const sidebarWidth = 250

  useEffect(()=> {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
      } catch(err) {
        console.log(err)
      }
    }
    getBoards()
  }, [ dispatch ])

  useEffect(()=> {
    console.log(boards)
  }, [ boards ])

  const logout = ()=> {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (<Drawer
    container={window.document.body}
    variant='permanent'
    open={true}
    sx={{
      width:sidebarWidth,
      height: '100%',
      '& > div': { borderRight: 'none' }
    }}>
    <List
      disablePadding
      sx={{
        width: sidebarWidth,
        height: '100vH',
        backgroundColor: assets.palette.background
      }}>
      <ListItem>
        <Box sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          color:assets.palette.primary.main
        }}>
          <Typography fontWeight='400' fontSize={20}>
            {user.username}
          </Typography>
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon sx={{ color:assets.palette.primary.main }}/>
          </IconButton>
        </Box>
      </ListItem>  
    </List>
  </Drawer>
  )
}
 
export default Sidebar;