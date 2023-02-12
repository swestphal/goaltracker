import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material'
import assets from '../../assets/index'
import { Box } from '@mui/system'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Link, useNavigate, useParams } from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useStrictDroppable } from '../../utils/useStrictDroppable'
import FavouriteList from './FavouriteList'

const Sidebar = () => {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ loading, setLoading ] = useState(true)
  const user = useSelector((state) => state.user.value)
  const boards = useSelector((state) => state.board.value)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [ enabled ] = useStrictDroppable(loading);
  const sidebarWidth = 250
  console.log(boardId)
 
  useEffect(()=> {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
        setLoading(false)
      } catch(err) {
        console.log(err)
      }
    }
    getBoards()
  }, [ dispatch ])

  useEffect(()=> {
    const activeItem = boards.findIndex(e=>e.id === boardId)
    if(boards.length > 0 && boardId === undefined) {
      // if boards and no boardId show first of boards
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [ boards, boardId, navigate ])

  const logout = ()=> {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const createBoard = async() => {
    try {
      const res = await boardApi.create()
      const newList = [ res, ...boards ]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const onDragEnd = async ({ source, destination }) => {
    const newList = [ ...boards ]
    // remove at source.index
    const [ removed ] = newList.splice(source.index,1)
    // insert removed element at destination.index
    newList.splice(destination.index,0,removed)
    
    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setBoards(newList))
    try {
      await boardApi.updatePosition({ boards: newList })
    } catch (err) {
      console.log(err)
    }
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
      <FavouriteList/>
      <ListItem>
        <Box sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography fontWeight='400' fontSize={20}>
            Goals
          </Typography>
          <IconButton onClick={createBoard}>
            <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
          </IconButton>
        </Box>
      </ListItem>    
      <DragDropContext onDragEnd={onDragEnd}>
        {enabled && <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                boards.map((item, index)=> (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot)=> (
                      <ListItemButton 
                        ref={provided.innerRef}
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
                          fontWeight='600'
                          sx={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>}
      </DragDropContext>
    </List>
  </Drawer>
  )
}
 
export default Sidebar;