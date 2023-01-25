import { Login } from 'auth/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { CurrentUserResponse } from 'auth/ts'

const initialState = {
  isLoggedIn: false,
  user: undefined as CurrentUserResponse | undefined,
  accessToken: null as null | string,
  refreshToken: null as null | string,
  accessTokenExpiresAt: null as null | string | Date,
  refreshTokenExpiresAt: null as null | string | Date,
  error: false,
  loading: false as boolean,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isFulfilled(Login), (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.refreshToken = payload.refreshToken
        state.accessTokenExpiresAt = payload.accessTokenExpiresAt
        state.refreshTokenExpiresAt = payload.refreshTokenExpiresAt
        state.isLoggedIn = true
        state.user = payload.user
        console.log('state.user', state.user)
      })
      .addMatcher(isPending(Login), state => {
        state.loading = true
      })
      .addMatcher(isRejected(Login), state => {
        state.loading = false
        state.error = true
      })
  },
})

export const authActions = authSlice.actions

export const { reducer: authReducer } = authSlice

export default authReducer
