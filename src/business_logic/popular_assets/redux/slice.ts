import { GetPopularAsset } from 'business_logic/popular_assets/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { UserAssetsResponse } from 'business_logic/user_assets/ts'

const initialState = {
  popularAsset: undefined as UserAssetsResponse | undefined,
  error: false,
  loading: false as boolean,
}

export const PopularAssetSlice = createSlice({
  name: 'popular_asset',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isFulfilled(GetPopularAsset), (state, { payload }) => {
        state.popularAsset = payload
        state.loading = false
      })
      .addMatcher(isPending(GetPopularAsset), state => {
        state.loading = true
      })
      .addMatcher(isRejected(GetPopularAsset), state => {
        state.loading = false
        state.error = true
      })
  },
})

export const popularAssetSliceActions = PopularAssetSlice.actions

export const { reducer: popularAssetReducer } = PopularAssetSlice

export default popularAssetReducer
