import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const favouriteBoardSlice = createSlice({
  name: 'favouriteBoard',
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/60806105/
    // error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
    setFavouriteBoards: (state, action) => void(state.value = action.payload)
  }
})

export const { setFavouriteBoards } = favouriteBoardSlice.actions

export default favouriteBoardSlice.reducer


