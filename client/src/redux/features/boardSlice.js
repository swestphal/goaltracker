import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/60806105/
    // error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
    setBoards: (state, action) => void(state.value = action.payload)
  }
})

export const { setBoards } = boardSlice.actions

export default boardSlice.reducer


