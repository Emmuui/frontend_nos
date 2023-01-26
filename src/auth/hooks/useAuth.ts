import { useMemo } from 'react'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { RootState, useAppDispatch, useAppSelector } from 'store'
import { authActions } from 'auth/redux/slice'
import authThunks from 'auth/redux/thunk'
import { CurrentUserResponse } from 'auth/ts'

export const useAuth = () => {
  const userState = (state: RootState): CurrentUserResponse | null | undefined => state.auth.user
  const isLoadingState = (state: RootState) => state.auth.loading
  const isAuth = useAppSelector(createSelector(userState, (user): boolean => user !== null && user !== undefined))
  const user = useAppSelector(userState)
  const isLoading = useAppSelector(isLoadingState)
  const dispatch = useAppDispatch()
  return useMemo(() => {
    const actions = {
      ...authActions,
      ...authThunks,
    }
    return {
      ...bindActionCreators(actions, dispatch),
      isAuth,
      user,
      isLoading,
    }
  }, [isAuth, user, dispatch])
}

export default useAuth
