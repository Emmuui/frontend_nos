import { createAsyncThunk } from '@reduxjs/toolkit'
import { AssetApi } from 'api'
import { UserAssetsResponse } from 'business_logic/user_assets/ts'

export const GetPopularAsset = createAsyncThunk<UserAssetsResponse>(
  'popular_asset', async (_, thunkAPI) => {
    try {
      const { data } = await AssetApi.get_popular_asset()
      return data
    } catch (e) {
      return thunkAPI
    }
  })

const popularAssetThunk = { GetPopularAsset }
export default popularAssetThunk
