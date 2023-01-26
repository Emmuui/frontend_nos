import { useAppDispatch, useAppSelector } from 'store'
import { useEffect } from 'react'
import useAuth from 'business_logic/auth/hooks/useAuth'
import { GetUserPortfolioAsset } from 'business_logic/user_assets/redux/thunk'


export const useUserAsset = () => {
  const { userAsset, loading, error } = useAppSelector(state => state.asset)
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth && !loading && !userAsset) {
      dispatch(GetUserPortfolioAsset())
    }
  }, [dispatch, userAsset, loading, isAuth])

  return {userAsset, loading, error}
}


export default useUserAsset
