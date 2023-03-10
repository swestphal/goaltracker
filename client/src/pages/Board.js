import { Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import StarOutlinedIcon  from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon  from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import boardApi from '../api/boardApi'
import EmojiPicker from '../components/shared/EmojiPicker'
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../redux/features/boardSlice'
import { setFavouriteBoards } from '../redux/features/favouriteBoardSlice'
import Kanban from '../components/shared/Kanban'

const Board = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boardId } = useParams()
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ sections, setSections ] = useState([])
  const [ isFavourite, setIsFavourite ] = useState(false)
  const [ icon, setIcon ] = useState('')
  const [ timer, setTimer ] = useState(null)

  const boards = useSelector((state)=> state.board.value)
  const favouriteBoards = useSelector((state)=> state.favouriteBoard.value)
  
  const timeout= 1000

  useEffect(()=> {
    const getBoard = async()=> {
      try {
        const board = await boardApi.getOne(boardId)
        setTitle(board.title)
        setDescription(board.description)
        setSections(board.sections)
        setIsFavourite(board.favourite)
        setIcon(board.icon)
        console.log(board)
      } catch (err) {
        console.log(err)
      }
    }
    getBoard()
  },[ boardId ])

  const updateBoardsWithKeyValue=(key,value)=> {
    let temp = [ ...boards ]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], [key]: value }
    return temp
  }
  const updateFavouritesWithKeyValue=(key, value)=> {
    let tempFavourite = [ ...favouriteBoards ]
    const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
    tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], [key]: value }
    return tempFavourite 
  }

  const updateBoard = async(key,value)=> {
    const temp = updateBoardsWithKeyValue(key, value)
   
    try {
      const board = await boardApi.update(boardId, { [key]: value }) 
      if (key === 'favourite') {
        let newFavouritesBoards = [ ...favouriteBoards ]   
        
        if (isFavourite) {
          // remove element by filtering id
          newFavouritesBoards = newFavouritesBoards.filter(e => e.id !== boardId)
        } else {
          // add element to beginning of newFavouritesBoards
          newFavouritesBoards.unshift(board)
        }
        dispatch(setFavouriteBoards(newFavouritesBoards))
        setIsFavourite(value)
      } else {
        if (isFavourite) {
          // update in favourite boards
          const tempFavourite = updateFavouritesWithKeyValue(key, value)
          dispatch(setFavouriteBoards(tempFavourite))
        }
      }
      // update boards
      dispatch(setBoards(temp))
      
    } catch (err) {
      console.log(err)
    }
   
  }

  const onIconChange = async (newIcon) => {
    setIcon(newIcon)
    updateBoard('icon', newIcon)
  }
  
  const updateTitle = async(e)=> {
    clearTimeout(timer)
    const newTitle= e.target.value
    setTitle(newTitle)
    
    const newTimer = setTimeout(async ()=> {
      updateBoard('title', newTitle)
    },timeout)

    setTimer(newTimer)
  }
  
  const updateDescription = async(e)=> {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    const newTimer = setTimeout(async()=> {
      updateBoard('description', newDescription)
    }, timeout)
    setTimer(newTimer)
  }

  const addFavourite = async()=> {
    updateBoard('favourite', !isFavourite)
    setIsFavourite(!isFavourite)
  }

  const deleteBoard = async () => {
    try {
      await boardApi.delete(boardId)
      if(isFavourite) {
        const newFavouritesBoards = favouriteBoards.filter(e=>e.id !== boardId)
        dispatch(setFavouriteBoards(newFavouritesBoards))
      }
      const newBoards = boards.filter(e => e.id !== boardId)
      if(newBoards.length===0) {
        navigate('/boards')
      } else {
        navigate(`/boards/${newBoards[0].id}`)
      }
      dispatch(setBoards(newBoards))
    } catch (err) {
      console.log(err)
    }
  }
  return ( 
    <>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
      }}>
        <IconButton variant='outlined' onClick={addFavourite}>
          {isFavourite ? (
            <StarOutlinedIcon color = "warning"/>
          ):<StarBorderOutlinedIcon/>}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteBoard}>
          <DeleteOutlineIcon/>
        </IconButton>
      </Box>
      <Box sx={{ padding:'10px 50px' }}>
        {/* Show and edit emoiji, title and description */}
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
            onChange={updateDescription}
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
          {/* Kanban board */}
          <Kanban data={sections} boardId={boardId}/>
        </Box>
      </Box>
    </>
  )
}
 
export default Board;