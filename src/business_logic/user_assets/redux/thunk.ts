import { createAsyncThunk } from '@reduxjs/toolkit'
import { AssetApi } from 'api'
import {
  CreateUserAssetTransactionRequest,
  PaginatedAssetsResponse,
  SearchAssetRequest,
  UserAssetsResponse,
} from 'business_logic/user_assets/ts'

export const GetUserPortfolioAsset = createAsyncThunk<UserAssetsResponse>('asset', async (_, thunkAPI) => {
  try {
    const { data } = await AssetApi.get_user_asset()
    return data
  } catch (e) {
    return thunkAPI
  }
})

export const SearchAssets = createAsyncThunk<PaginatedAssetsResponse, SearchAssetRequest>(
  'asset/search',
  async (request, thunkAPI) => {
    try {
      const { data } = await AssetApi.search_by_asset(request)
      return data
    } catch (e) {
      return thunkAPI
    }
  }
)


export const PurchaseAsset = createAsyncThunk(
  'asset/purchase',
  async (request: CreateUserAssetTransactionRequest, thunkAPI) => {
    try {
      await AssetApi.asset_transactions(request)
      return request
    } catch (e) {
      return thunkAPI
    }
  }
)

const assetThunk = { GetUserPortfolioAsset, SearchAssets, PurchaseAsset}
export default assetThunk
