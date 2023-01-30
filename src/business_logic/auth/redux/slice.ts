import { Login, LogOut, SignUp } from 'business_logic/auth/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { CurrentUserResponse, LoginResponse, RefreshTokenResponse } from 'business_logic/auth/ts'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
  reducers: {
    loginSuccess: (state, { payload }: { payload: LoginResponse }) => {
      state.isLoggedIn = true
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      state.accessTokenExpiresAt = payload.accessTokenExpiresAt
      state.refreshTokenExpiresAt = payload.refreshTokenExpiresAt
      state.user = payload.user
    },
    refreshTokenSuccess: (state, { payload }: { payload: RefreshTokenResponse }) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      state.accessTokenExpiresAt = payload.accessTokenExpiresAt
      state.refreshTokenExpiresAt = payload.refreshTokenExpiresAt
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.accessToken);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LogOut, () => initialState)
      .addMatcher(isFulfilled(Login, SignUp), (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.refreshToken = payload.refreshToken
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.accessToken);
        state.accessTokenExpiresAt = payload.accessTokenExpiresAt
        state.refreshTokenExpiresAt = payload.refreshTokenExpiresAt
        state.isLoggedIn = true
        state.loading = false
        state.user = payload.user
      })
      .addMatcher(isPending(Login, SignUp), state => {
        state.loading = true
      })
      .addMatcher(isRejected(Login, SignUp), state => {
        state.loading = false
        state.error = true
      })
  },
})

export const authActions = authSlice.actions

export const authPersistConfig = {
  key: 'auth',
  storage,
}

export default persistReducer(authPersistConfig, authSlice.reducer)
