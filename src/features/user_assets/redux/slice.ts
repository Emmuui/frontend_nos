import { GetUserPortfolioAsset, SearchAssets, PurchaseAsset } from 'features/user_assets/redux/thunk'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import {
  UserAssetsResponse,
  AssetResponse,
  SearchAssetResponse,
} from 'features/user_assets/ts'


export interface AssetInitialState {
  userAsset: UserAssetsResponse | undefined
  error: boolean
  asset: AssetResponse[]
  assetMeta: SearchAssetResponse | undefined
  loading: boolean
  isRefetch: boolean
  prev_search: string
  errorMessage: string | undefined
}

const initialState: AssetInitialState = {
  userAsset: undefined as UserAssetsResponse | undefined,
  error: false,
  asset: [],
  assetMeta: undefined,
  loading: false as boolean,
  isRefetch: false,
  prev_search: '',
  errorMessage: undefined,
}

export const AssetSlice = createSlice({
  name: 'asset',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isFulfilled(SearchAssets), (state, action) => {
        state.asset = action.payload.items
        state.assetMeta = action.payload.meta
        state.loading = false
        state.isRefetch = false
        state.prev_search = action.meta.arg.search ?? ''
      })
      .addMatcher(isFulfilled(PurchaseAsset), state => {
        state.isRefetch = true
      })
      .addMatcher(isPending(PurchaseAsset), state => {
        state.isRefetch = true
      })
      .addMatcher(isFulfilled(GetUserPortfolioAsset), (state, { payload }) => {
        state.userAsset = payload
        state.loading = false
        state.isRefetch = false
        state.errorMessage = undefined
      })
      .addMatcher(isPending(GetUserPortfolioAsset, SearchAssets), state => {
        state.loading = true
        state.isRefetch = false
      })
      .addMatcher(isRejected(GetUserPortfolioAsset, SearchAssets), (state, action) => {
        state.loading = false
        state.error = true
        state.userAsset = undefined
        state.errorMessage = action.payload as string
      })
  },
})

export const assetSliceActions = AssetSlice.actions

export const { reducer: assetReducer } = AssetSlice

export default assetReducer
