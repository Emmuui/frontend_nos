import { api } from 'api'

export const PopularAssetApi = {
  get_popular_asset() {
    return api.get('assets/top-movers/portfolio?limit=100')
  },
}
