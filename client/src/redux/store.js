import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import favoriteReducer from './features/favouriteSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favorites: favoriteReducer
  }
})