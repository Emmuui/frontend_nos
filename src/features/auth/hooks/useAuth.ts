import { createSelector } from '@reduxjs/toolkit'
import { RootState, useAppDispatch, useAppSelector } from 'store'
import { authActions } from 'features/auth/redux/slice'
import authThunks from 'features/auth/redux/thunk'
import { CurrentUserResponse } from 'features/auth/ts'

export const useAuth = () => {
  const userState = (state: RootState): CurrentUserResponse | null | undefined => state.authSlice.user
  const isLoggedInState = (state: RootState) => state.authSlice.isLoggedIn
  const errorState = (state: RootState) => state.authSlice.error
  const error = useAppSelector(errorState)
  const errorMessageState = (state: RootState) => state.authSlice.errorMessage
  const errorMessage = useAppSelector(errorMessageState)
  const isLoadingState = (state: RootState) => state.authSlice.loading
  const isAuth = useAppSelector(createSelector(userState, (user): boolean => user !== null && user !== undefined))
  const user = useAppSelector(userState)
  const isLoading = useAppSelector(isLoadingState)
  const isLoggedIn = useAppSelector(isLoggedInState)
  const dispatch = useAppDispatch()
  return {
    isAuth,
    user,
    isLoading,
    dispatch,
    isLoggedIn,
    errorMessage,
    error_state: error,
    ...authThunks,
    ...authActions,
  }
}

export default useAuth
