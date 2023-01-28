import axios from 'axios'
import { DashboardRegistrationRequest, LoginRequest } from 'business_logic/auth/ts'
import { CreateUserAssetTransactionRequest, SearchAssetRequest } from 'business_logic/user_assets/ts'

const { REACT_APP_API_URL } = process.env

export const api = axios.create({
  withCredentials: true,
  baseURL: `${REACT_APP_API_URL}`,
})

export const authAPI = {
  login(request: LoginRequest) {
    return api.post('/auth/login', request)
  },
  sign_up(request: DashboardRegistrationRequest) {
    return api.post('/users/dashboard-users/register', request)
  },
}

export const AssetApi = {
  get_user_asset() {
    return api.get('assets/user-assets')
  },
  get_popular_asset() {
    return api.get('assets/top-movers/portfolio?limit=100')
  },
  search_by_asset(request: SearchAssetRequest) {
    return api.get('assets', {params: request})
  },
  asset_transactions(request: CreateUserAssetTransactionRequest){
    return api.post('/user-asset-transactions/purchase-transaction', request)
  },
}

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
