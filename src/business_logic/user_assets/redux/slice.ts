import { GetUserPortfolioAsset, SearchAssets, PurchaseAsset } from 'business_logic/user_assets/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import {
  SearchAssetRequest,
  UserAssetsResponse,
  AssetResponse,
  SearchAssetResponse,
} from 'business_logic/user_assets/ts'

export interface AssetInitialState {
  userAsset: UserAssetsResponse | undefined
  error: boolean
  asset: Record<number, AssetResponse[]>
  assetMeta: SearchAssetResponse | undefined
  loading: boolean
  isRefetch: boolean
}

const initialState: AssetInitialState = {
  userAsset: undefined as UserAssetsResponse | undefined,
  error: false,
  asset: {} as Record<number, AssetResponse[]>,
  assetMeta: undefined,
  loading: false as boolean,
  isRefetch: false,
}

export const AssetSlice = createSlice({
  name: 'asset',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isFulfilled(SearchAssets), (state, action) => {
        state.asset[0] = [...(state.asset[0] ?? []), ...action.payload.items]
        state.assetMeta = action.payload.meta
      })
      .addMatcher(isFulfilled(PurchaseAsset), (state, action) => {
        state.isRefetch = true

      })
      .addMatcher(isPending(PurchaseAsset), (state, action) => {
        state.isRefetch = true
      })
      .addMatcher(isFulfilled(GetUserPortfolioAsset), (state, { payload }) => {
        state.userAsset = payload
        state.loading = false
        state.isRefetch = false
      })
      .addMatcher(isPending(GetUserPortfolioAsset, SearchAssets), state => {
        state.loading = true
        state.isRefetch = false
      })
      .addMatcher(isRejected(GetUserPortfolioAsset, SearchAssets), state => {
        state.loading = false
        state.error = true
      })
  },
})

export const assetSliceActions = AssetSlice.actions

export const { reducer: assetReducer } = AssetSlice

export default assetReducer
