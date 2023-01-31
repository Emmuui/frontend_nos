import { useAppDispatch, useAppSelector } from 'store'
import { useEffect } from 'react'
import useAuth from 'features/auth/hooks/useAuth'
import { GetUserPortfolioAsset } from 'features/user_assets/redux/thunk'


export const useUserAsset = () => {
  const { userAsset, loading, error, isRefetch } = useAppSelector(state => state.AssetSlice)
  const { isAuth, isLoggedIn } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn && !loading && !userAsset && !isRefetch) {
      dispatch(GetUserPortfolioAsset())
    }
    if (isLoggedIn && isRefetch) {
      dispatch(GetUserPortfolioAsset())
    }
  }, [dispatch, userAsset, loading, isAuth, isRefetch])

  return {userAsset, loading, error}
}


export default useUserAsset
