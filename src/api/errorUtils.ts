import { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface NosisApiErrorPayload<T = Record<string, string>> {
  message: string
  errors?: T
}

export type NosisApiError<T = Record<string, string>> = AxiosError<NosisApiErrorPayload<T>>

type CreateAsyncThunkType = Parameters<typeof createAsyncThunk>[1]
type GetThunkAPI = Parameters<CreateAsyncThunkType>[1] & { rejectWithValue: any }

const extractErrorMessage = (error: NosisApiError): string => {
  return error?.response?.data.message as string
}

export const handleErrors = (error: NosisApiError, thunkAPI: GetThunkAPI) => {
  const errorMessage = extractErrorMessage(error)
  return thunkAPI.rejectWithValue(errorMessage)
}
