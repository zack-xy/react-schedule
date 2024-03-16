import { configureStore } from '@reduxjs/toolkit'
import type { UserStateType } from './userReducer'
import userReducer from './userReducer'
import type { ComponentsStateType } from './componentsReducer'
import componentsReducer from './componentsReducer'

export interface StoreType {
  user: UserStateType
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
})
