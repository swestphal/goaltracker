import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import authUtils from '../../utils/authUtils'
import Loading from '../shared/Loading'
import Sidebar from '../shared/Sidebar'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/userSlice'

const AppLayout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate('/login')
      } else {
        // save user
        dispatch(setUser(user))
        setLoading(false)
      }
    }
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    loading ? (
      <Loading fullHeight />
    ) : (
      <Box sx={{
        display: 'flex'
      }}>
        <Sidebar />
        <Box sx={{
          flexGrow: 1,
          p: 1,
          height: '100vh',
          width: 'max-content',
          background: 'linear-gradient(to right bottom, #33a7ab, #6B0AC9)'
        }}>
          <Outlet />
        </Box>
      </Box>
    )
  )
}

export default AppLayout