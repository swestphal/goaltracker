import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boardApi from '../../api/boardApi';
import { setFavouriteBoards } from '../../redux/features/favouriteBoardSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useStrictDroppable } from '../../utils/useStrictDroppable'



const FavouriteList = () => {
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(true)
  const [ enabled ] = useStrictDroppable(loading)
  const favouriteBoards = useSelector((state)=> state.favouriteBoard.value)
  const [ activeIndex, setActiveIndex ] = useState(0)
  const { boardId } = useParams()
  
  useEffect(()=> {
    const getFavouriteBoards = async() => {
      try {
        const res = await boardApi.getFavourites()  
        dispatch(setFavouriteBoards(res))
        setLoading(false)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    getFavouriteBoards()
  },[ dispatch ])

  useEffect(() => {
    const index = favouriteBoards.findIndex(e => e.id === boardId)
    setActiveIndex(index)
  }, [ favouriteBoards, boardId ])
  
  const onDragEnd = async ({ source, destination }) => {
    const newList = [ ...favouriteBoards ]
    // remove at source.index
    const [ removed ] = newList.splice(source.index,1)
    // insert removed element at destination.index
    newList.splice(destination.index,0,removed)
    
    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setFavouriteBoards(newList))
    try {
      await boardApi.updateFavouritePosition({ boards: newList })
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <>
      <ListItem>
        <Box sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography fontWeight='400' fontSize={20}>
        Favourites
          </Typography>
        </Box>
      </ListItem>  
      <DragDropContext onDragEnd={onDragEnd}>
        {enabled && <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                favouriteBoards.map((item, index)=> (
                  <Draggable key={`fav${item.id}`} draggableId={`fav${item.id}`} index={index}>
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
    </>
  )
}
 
export default FavouriteList;