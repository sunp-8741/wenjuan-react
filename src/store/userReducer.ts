import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UseStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UseStateType = {
  username: '',
  nickname: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    loginReducer: (state: UseStateType, action: PayloadAction<UseStateType>) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions
