import { combineReducers } from 'redux'
import authReducer from 'business_logic/auth/redux/slice'
import assetReducer from 'business_logic/user_assets/redux/slice'
import popularAssetReducer from 'business_logic/popular_assets/redux/slice'

export default combineReducers({
  auth: authReducer,
  asset: assetReducer,
  popular_asset: popularAssetReducer,
})
