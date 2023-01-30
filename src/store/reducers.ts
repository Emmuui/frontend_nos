import { combineReducers } from 'redux'
import authSlice from 'business_logic/auth/redux/slice'
import AssetSlice from 'business_logic/user_assets/redux/slice'
import PopularAssetSlice from 'business_logic/popular_assets/redux/slice'

export const rootReducer = combineReducers({
  authSlice,
  AssetSlice,
  PopularAssetSlice,
})
