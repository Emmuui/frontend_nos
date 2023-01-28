import AssetTableData from 'shared/components/AssetTable'
import { useMemo } from 'react'
import * as React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './styles.module.scss'
import { AssetResponse } from 'business_logic/user_assets/ts'

type AssetTableParams = {
  assets: AssetResponse[]
  loading: boolean
  title: string
}

export const AssetTable = ({ assets = [], loading = false, title = '' }: AssetTableParams) => {
  const head = useMemo(() => {
    return [
      { label: 'Asset Name' },
      { label: 'Symbol' },
      { label: 'Total value' },
      { label: 'Buy price' },
      { label: 'Quantity' },
      { label: 'Currency price' },
    ]
  }, [])

  const createData = (
    id: number,
    image: string,
    asset_name: string,
    symbol: string,
    totalValue: number,
    avgBuyPrice: number,
    totalQuantity: number,
    currencyPrice: number
  ): {
    id: number
    image: string
    asset_name: string
    symbol: string
    totalValue: number
    avgBuyPrice: number
    totalQuantity: number
    currencyPrice: number
  } => {
    return { id, image, asset_name, symbol, totalValue, avgBuyPrice, totalQuantity, currencyPrice }
  }

  const tableRows = assets?.map(asset =>
    createData(
      asset?.id,
      asset?.externalImageUrl ?? asset?.name,
      asset?.name,
      asset?.symbol,
      asset?.totalVolume,
      asset?.currentPrice,
      asset?.id,
      asset?.currentPrice
    )
  )

  return (
    <>
      {tableRows?.length && !loading ? (
        <div>
          <h1>{title}</h1>
          <AssetTableData head={head} data={tableRows} />
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </>
  )
}
