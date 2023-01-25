import { combineReducers } from 'redux'
import authReducer from 'auth/redux/slice'

export default combineReducers({
  auth: authReducer,
})
