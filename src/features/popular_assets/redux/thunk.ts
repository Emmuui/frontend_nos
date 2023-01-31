import { createAsyncThunk } from '@reduxjs/toolkit'
import { PopularAssetApi } from 'features/popular_assets/api'
import { UserAssetsResponse } from 'features/user_assets/ts'

export const GetPopularAsset = createAsyncThunk<UserAssetsResponse>(
  'popular_asset', async (_, thunkAPI) => {
    try {
      const { data } = await PopularAssetApi.get_popular_asset()
      return data
    } catch (e) {
      return thunkAPI
    }
  })

const popularAssetThunk = { GetPopularAsset }
export default popularAssetThunk
