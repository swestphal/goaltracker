import { Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import StarOutlinedIcon  from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon  from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import boardApi from '../api/boardApi'
import EmojiPicker from '../components/shared/EmojiPicker'
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../redux/features/boardSlice'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'

const Board = () => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ sections, setSections ] = useState([])
  const [ isFavourite, setIsFavourite ] = useState(false)
  const [ icon, setIcon ] = useState('')
  const [ timer, setTimer ] = useState(null)

  const boards = useSelector((state)=> state.board.value)

  useEffect(()=> {
    const getBoard = async()=> {
      try {
        const board = await boardApi.getOne(boardId)
        setTitle(board.title)
        setDescription(board.description)
        setSections(board.sections)
        setIsFavourite(board.isFavourite)
        setIcon(board.icon)
        console.log(board)
      } catch (err) {
        console.log(err)
      }
    }
    getBoard()
  },[ boardId ])

  const onIconChange = async (newIcon) => {
    setIcon(newIcon)
    let temp = [ ...boards ]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], icon: newIcon }

    // if (isFavourite) {
    //   let tempFavourite = [ ...favouriteList ]
    //   const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
    //   tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon }
    //   dispatch(setFavouriteList(tempFavourite))
    // }

    setIcon(newIcon)
    dispatch(setBoards(temp))
    try {
      await boardApi.update(boardId, { icon: newIcon })
    } catch (err) {
      console.log(err)
    }
  }

  const updateTitle = async(e)=> {
    clearTimeout(timer)
    const newTitle= e.target.value
    setTitle(newTitle)
    
    const newTimer = setTimeout(async ()=> {
      let temp = [ ...boards ]
      const index = temp.findIndex(e => e.id === boardId)
      temp[index] = { ...temp[index], title: newTitle }
      try {
        await boardApi.update(boardId, { title: newTitle })
        dispatch(setBoards(temp))
      } catch (err) {
        console.log(err)
      }
    },2000)

    setTimer(newTimer)
  }
  
  return ( 
    <>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
      }}>
        <IconButton variant='outlined'>
          {isFavourite ? (
            <StarOutlinedIcon color = "warning"/>
          ):<StarBorderOutlinedIcon/>}
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlineIcon/>
        </IconButton>
      </Box>
      <Box sx={{ padding:'10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange}/>
          <TextField 
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input':{ padding:0 },
              '& .MuiOutlinedInput-notchedOutline':{ border:'unset ' },
              '& .MuiOutlinedInput-root':{ fontSize:'2rem', fontWeight:'700' }
            }}>

          </TextField>
          <TextField 
            value={description}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input':{ padding:0 },
              '& .MuiOutlinedInput-notchedOutline':{ border:'unset '  },
              '& .MuiOutlinedInput-root':{ fontSize:'0.75rem' ,padding:'0' }
            }}>
          </TextField>
        </Box>
        <Box>
          <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Button>
            Add Section
            </Button>
            <Typography variant="body2" fontWeight="700">
              {sections.length} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin:'10p 0' }}/>
          {/* board */}
        </Box>
      </Box>
    </>
  )
}
 
export default Board;