import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { DashboardRegistrationRequest, LoginRequest, LoginResponse } from 'features/auth/ts'
import { authAPI } from 'features/auth/api'
import { handleErrors, NosisApiError } from 'api/errorUtils'

export const Login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login', async (requestData, thunkAPI) => {
  try {
    const { data } = await authAPI.login(requestData)
    return data
  } catch (e: any) {
    return handleErrors(e as NosisApiError, thunkAPI)
  }
})

export const SignUp = createAsyncThunk<LoginResponse, DashboardRegistrationRequest>(
  'auth/sign_up', async (requestData, thunkAPI) => {
    try {
      const { data } = await authAPI.sign_up(requestData)
      return data
    } catch (e) {
      return handleErrors(e as NosisApiError, thunkAPI)
    }
  })

export const LogOut = createAction<void>('auth/logout')

const authThunks = { Login, SignUp, LogOut }
export default authThunks
