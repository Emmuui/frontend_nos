
export interface UserAssetsResponse {
  items: UserAssetResponse[]
}

export interface UserAssetResponse {
  id: number
  asset: AssetResponse

  /** @format date-time */
  createdAt: string
  totalValue: number
  avgBuyPrice: number
  totalQuantity: number
  percentageInTotalCapital: number
  totalPriceChange: number
  totalPriceChangePercentage: number
  priceChange24: number
  priceChangePercentage24: number
}

export interface AssetResponse {
  id: number

  /** @format date-time */
  updatedAt: string
  type: AssetTypeResponse
  name: string
  symbol: string
  externalId: string
  currency: string
  currentPrice: number
  priceChangePercentageYearly?: number
  priceChangePercentage24: number
  priceChange24: number
  marketCap: number
  totalVolume: number
  externalImageUrl: string | null
  internalImageUrl: string | null
}

export interface AssetTypeResponse {
  id: number
  name: 'Crypto' | 'Stock' | 'Offline' | 'NFT' | 'Custom' | 'Commodity'
}


export interface SearchAssetRequest {
  limit: number
  page: number
  search?: string | null
}


export interface SearchAssetResponse {
  itemCount: number
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface PaginatedAssetsResponse {
  items: AssetResponse[]
  meta: SearchAssetResponse
}

export interface CreateUserAssetTransactionRequest {
  assetId: number
  quantity: number
  price: number
  transactionDate: string
}
