import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/60806105/
    // error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
    setFavouritesList: (state, action) => void(state.value = action.payload)
  }
})

export const { setFavouritesList } = favouriteSlice.actions

export default favouriteSlice.reducer


