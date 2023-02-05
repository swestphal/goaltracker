import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/60806105/
    // error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
    setUser: (state, action) => void(state.value = action.payload)
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer


