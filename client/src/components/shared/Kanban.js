import { Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import StarOutlinedIcon  from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon  from '@mui/icons-material/StarBorderOutlined'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import boardSectionApi from './../../api/boardSectionApi'
import EmojiPicker from './EmojiPicker'
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from './../../redux/features/boardSlice'
import { setFavouriteBoards } from './../../redux/features/favouriteBoardSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'


const Kanban = (props) => {
  const boardId = props.boardId
  console.log(boardId)
  const [ data, setData ] = useState([])
  const [ timer, setTimer ] = useState(null)
  
  const timeout= 1000
  
  useEffect(() => {
    setData(props.data)
  }, [ props.data ])

  const onDragEnd = () => {
    
  }
 
  const createSection = async() => {
    try {
      const section = await boardSectionApi.create(boardId)
      setData([ ...data,section ])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteSection = async(sectionId) => {
    console.log(sectionId)
    try {
      await boardSectionApi.delete(boardId,sectionId)
      const newData = [ ...data ].filter(e=>e.id !== sectionId)
      setData(newData)
    } catch (err) {
      console.log(err)
    }
  }
  

  const updateSectionTitle = async(e,sectionId) => {
    clearTimeout(timer)
    const newSectionTitle = e.target.value
    const newData = [ ...data ]
    const index = newData.findIndex(e=> e.id === sectionId)
    newData[index].title = newSectionTitle
    setData(newData)
    const newTimer = setTimeout(async ()=> {
      try {
        await boardSectionApi.update(boardId, sectionId, { title:newSectionTitle })
      } catch (err) {
        console.log(err)
      }
    },timeout)

    setTimer(newTimer)
  }
  return ( 
    <>
      {/* Button to add section*/}
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
        <Button onClick={createSection}>
            Add Section
        </Button>
        <Typography variant="body2" fontWeight="700">
          {data.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin:'10p 0' }}/>
      {/* board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
          display:'flex',
          alignItems:'flex-start',
          width: 'calc(100vw - 400px)',
          overflow:'auto'
        }}>
          {data.map(section => (
            <div key={section.id} style={{ width:'300px' }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided)=> (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width:'300px', 
                      padding:'10px',
                      marginRight:'10px'
                    }}>
                    <Box
                      sx={{ display: 'flex',
                        alignItems:'center',
                        justifyContent:'space-between',
                        marginBottom:'10px' }}>
                      <TextField
                        value={section.title}
                        placeholder='Untitled'
                        onChange={(e)=> updateSectionTitle(e,section.id)}
                        variant='outlined'
                        sx={{
                          flexGrow:1,
                          '& .MuiOutlinedInput-input':{ padding:0 },
                          '& .MuiOutlinedInput-notchedOutline':{ border:'unset ' },
                          '& .MuiOutlinedInput-root':{ fontSize:'2rem', fontWeight:'700' }
                        }}/>
                      <IconButton 
                        variant='outlined' 
                        size='small'
                        sx={{
                          color:'gray',
                          '&:hover': { color:'green' } 
                        }}>
                        <AddOutlinedIcon/>
                      </IconButton>
                      <IconButton 
                        variant='outlined' 
                        size='small'
                        sx={{
                          color:'gray',
                          '&:hover': { color:'red' } 
                          
                        }}
                        onClick={()=> deleteSection(section.id)}>
                        <DeleteOutlinedIcon/>
                      </IconButton>
                    </Box>
                    {/* Tasks */}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
    </>
  )
}
 
export default Kanban