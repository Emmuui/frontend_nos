import { useAppDispatch, useAppSelector } from 'store'
import { useCallback, useEffect } from 'react'
import useAuth from 'business_logic/auth/hooks/useAuth'
import { SearchAssets } from 'business_logic/user_assets/redux/thunk'
import { SearchAssetRequest } from 'business_logic/user_assets/ts'

export const useSearchAsset = ({ limit, page, search }: SearchAssetRequest) => {
  const { asset, assetMeta, loading, error } = useAppSelector(state => state.asset)
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()
  console.log('in hook')

  useEffect(() => {
    if (!asset[0] && !loading) {
      dispatch(
        SearchAssets({
          limit: limit ?? 10,
          page: page ?? 1,
          search,
        })
      )
    }
  }, [dispatch, asset, loading, limit, search, page])

  return { assets: asset[0], loading, error, assetMeta }
}

export default useSearchAsset
