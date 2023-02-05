import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/authApi'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [emailErrText, setEmailErrText] = useState('')
  const [passwordErrText, setPasswordErrText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailErrText('')
    setPasswordErrText('')

    const data = new FormData(e.target)
    const email = data.get('email').trim()
    const password = data.get('password').trim()

    let err = false

    if (email === '') {
      err = true
      setEmailErrText('Please fill this field')
    }
    if (password === '') {
      err = true
      setPasswordErrText('Please fill this field')
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.login({ email, password })
      setLoading(false)
      localStorage.setItem('token', res.token)
      navigate('/')
    } catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'email') {
          setEmailErrText(e.msg)
        }
        if (e.param === 'password') {
          setPasswordErrText(e.msg)
        }
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          disabled={loading}
          error={emailErrText !== ''}
          helperText={emailErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to='/signup'
        sx={{ textTransform: 'none' }}
      >Don't have an account? Signup
      </Button>
    </>
  )
}

export default Login