import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface UserStateType {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
