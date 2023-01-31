import { CreateUserAssetTransactionRequest, SearchAssetRequest } from 'features/user_assets/ts'
import { api } from 'api'

export const AssetApi = {
  get_user_asset() {
    return api.get('assets/user-assets')
  },
  search_by_asset(request: SearchAssetRequest) {
    return api.get('assets', { params: request })
  },
  asset_transactions(request: CreateUserAssetTransactionRequest) {
    return api.post('/user-asset-transactions/purchase-transaction', request)
  },
}
