import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import favouriteBoardReducer from './features/favouriteBoardSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favouriteBoard: favouriteBoardReducer
  }
})