import { createAsyncThunk } from '@reduxjs/toolkit'
import { AssetApi } from 'api'
import { UserAssetsResponse } from 'business_logic/user_assets/ts'

export const GetUserPortfolioAsset = createAsyncThunk<UserAssetsResponse>(
  'asset', async (_, thunkAPI) => {
    try {
      const { data } = await AssetApi.get_user_asset()
      return data
    } catch (e) {
      return thunkAPI
    }
  })

const assetThunk = { GetUserPortfolioAsset }
export default assetThunk
