import { configureStore } from '@reduxjs/toolkit'
import type { UserStateType } from './userReducer'
import userReducer from './userReducer'

export interface StoreType {
  user: UserStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
