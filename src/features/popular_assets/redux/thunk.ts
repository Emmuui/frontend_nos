import { createAsyncThunk } from '@reduxjs/toolkit'
import { PopularAssetApi } from 'features/popular_assets/api'
import { UserAssetsResponse } from 'features/user_assets/ts'
import { handleErrors, NosisApiError } from 'api/errorUtils'

export const GetPopularAsset = createAsyncThunk<UserAssetsResponse>(
  'popular_asset', async (_, thunkAPI) => {
    try {
      const { data } = await PopularAssetApi.get_popular_asset()
      return data
    } catch (e) {
      return handleErrors(e as NosisApiError, thunkAPI)
    }
  })

const popularAssetThunk = { GetPopularAsset }
export default popularAssetThunk
