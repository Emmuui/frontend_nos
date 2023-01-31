import { useAppDispatch, useAppSelector } from 'store'
import { useCallback, useEffect } from 'react'
import { SearchAssets } from 'features/user_assets/redux/thunk'
import { SearchAssetRequest } from 'features/user_assets/ts'

export const useSearchAsset = ({ limit, page, search }: SearchAssetRequest) => {
  const { asset, assetMeta, loading, error } = useAppSelector(state => state.AssetSlice)
  const dispatch = useAppDispatch()

  const handleFetch = useCallback(() => {
    dispatch(
      SearchAssets({
        limit: limit ?? 10,
        page: page ?? 1,
        search,
      })
    )
  }, [limit, search, page])

  const disabled = search?.length ? search?.length < 2 : false
  useEffect(() => {
    if (disabled) return

    if (!asset && !loading) {
      handleFetch()
    }
  }, [handleFetch, asset, loading, disabled])

  useEffect(() => {
    if (disabled) return
    handleFetch()
  }, [handleFetch, disabled])


  return { assets: asset, loading, error, assetMeta }
}

export default useSearchAsset
