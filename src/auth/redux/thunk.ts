import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginRequest, LoginResponse } from 'auth/ts'
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


const authThunks = { Login }
export default authThunks
