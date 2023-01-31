import { combineReducers } from 'redux'
import authSlice from 'features/auth/redux/slice'
import AssetSlice from 'features/user_assets/redux/slice'
import PopularAssetSlice from 'features/popular_assets/redux/slice'

export const rootReducer = combineReducers({
  authSlice,
  AssetSlice,
  PopularAssetSlice,
})
