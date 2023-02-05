import React from 'react'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import assets from '../assets';

const Home = () => {
  return ( 
    <Box sx = {{
      height:'100%',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <LoadingButton variant='outlined' sx={{borderColor:assets.palette.primary.main, color:assets.palette.primary.main}}>
        Create a goal
      </LoadingButton>
    </Box> );
}
 
export default Home;