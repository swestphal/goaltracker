import React, { useState } from 'react'
import { Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import assets from '../assets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import boardApi from '../api/boardApi';
import { setBoards } from '../redux/features/boardSlice';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState()

  const createBoard = async () => {
    setLoading(true)
    try {
      const res = await boardApi.create()
      dispatch(setBoards([ res ]))
      navigate(`/boards/${res.id}`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return ( 
    <Box sx = {{
      height:'100%',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <LoadingButton onClick={createBoard} variant='outlined' sx={{ borderColor:assets.palette.primary.main, color:assets.palette.primary.main }}>
        Create a goal
      </LoadingButton>
    </Box> );
}
 
export default Home;