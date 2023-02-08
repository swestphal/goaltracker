import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material'
import assets from '../../assets/index'
import { Box } from '@mui/system'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Link, useNavigate, useParams } from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
const Sidebar = () => {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const user = useSelector((state) => state.user.value)
  const boards = useSelector((state) => state.board.value)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const sidebarWidth = 250
  console.log(boardId)
 
  useEffect(()=> {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        console.log('res', res[0])
        dispatch(setBoards(res))
        if(res.length > 0 && boardId === undefined) {
          // if boards and no boardId show first of boards
          navigate(`/boards/${res[0].id}`)
        }
      } catch(err) {
        console.log(err)
      }
    }
    getBoards()
  }, [ dispatch ])

  useEffect(()=> {
    console.log(boards)
  }, [ boards ])

  const updateActive = (listBoards) => {
    const activeItem = listBoards.findIndex(e=>e.id === boardId)
    setActiveIndex(activeItem)
  }

  const logout = ()=> {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const onDragEnd = () => {

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                boards.map((item, index)=> (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot)=> (
                      <ListItemButton ref={provided.innerRe}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl:'20px',
                          cursor: snapshot.isDragging ? 'grab':'pointer!important'
                        }}>
                        <Typography 
                          variant='body2'
                          fontWeight='700'
                          sx={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))
              }

            </div>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  </Drawer>
  )
}
 
export default Sidebar;