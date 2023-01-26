import { GetUserPortfolioAsset } from 'business_logic/user_assets/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { UserAssetsResponse } from 'business_logic/user_assets/ts'

const initialState = {
  userAsset: undefined as UserAssetsResponse | undefined,
  error: false,
  loading: false as boolean,
}

export const AssetSlice = createSlice({
  name: 'asset',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isFulfilled(GetUserPortfolioAsset), (state, { payload }) => {
        state.userAsset = payload
      })
      .addMatcher(isPending(GetUserPortfolioAsset), state => {
        state.loading = true
      })
      .addMatcher(isRejected(GetUserPortfolioAsset), state => {
        state.loading = false
        state.error = true
      })
  },
})

export const assetSliceActions = AssetSlice.actions

export const { reducer: assetReducer } = AssetSlice

export default assetReducer
