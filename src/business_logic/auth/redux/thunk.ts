import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { DashboardRegistrationRequest, LoginRequest, LoginResponse } from 'business_logic/auth/ts'
import { authAPI } from 'api'

export const Login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login', async (requestData, thunkAPI) => {
  try {
    const { data } = await authAPI.login(requestData)
    return data
  } catch (e) {
    return thunkAPI
  }
})

export const SignUp = createAsyncThunk<LoginResponse, DashboardRegistrationRequest>(
  'auth/sign_up', async (requestData, thunkAPI) => {
    try {
      const { data } = await authAPI.sign_up(requestData)
      return data
    } catch (e) {
      return thunkAPI
    }
  })

export const LogOut = createAction<void>('auth/logout')

const authThunks = { Login, SignUp, LogOut }
export default authThunks
