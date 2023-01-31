import { useAppDispatch, useAppSelector } from 'store'
import { useEffect } from 'react'
import { GetPopularAsset } from 'features/popular_assets/redux/thunk'


export const usePopularAsset = () => {
  const { popularAsset, loading, error } = useAppSelector(state => state.PopularAssetSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!loading && !popularAsset) {
      dispatch(GetPopularAsset())
    }
  }, [dispatch, popularAsset, loading])

  return {popularAsset, loading, error}
}


export default usePopularAsset
