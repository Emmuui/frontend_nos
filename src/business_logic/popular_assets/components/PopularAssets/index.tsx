import AssetTableData from 'shared/components/AssetTable'
import { useMemo } from 'react'
import * as React from 'react'
import { CircularProgress } from '@mui/material';
import styles from './styles.module.scss'
import usePopularAsset from 'business_logic/popular_assets/hooks/usePopularAsset'

export const GetPopularAsset = () => {
  const { popularAsset, loading } = usePopularAsset()

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

  const tableRows = popularAsset?.items.map(asset =>
    createData(
      asset?.id,
      asset?.asset.externalImageUrl ?? asset?.asset.name,
      asset?.asset.name,
      asset?.asset.symbol,
      asset?.totalValue,
      asset?.avgBuyPrice,
      asset?.totalQuantity,
      asset?.asset.currentPrice
    )
  )

  return (
    <>
      {tableRows?.length && !loading ? (
        <div className={styles.asset_table__container}>
          <h1 className={styles.asset_table__title}>Top Movers</h1>
          <AssetTableData head={head} data={tableRows} />
        </div>
      ) : (
        <div><CircularProgress/></div>
      )}
    </>
  )
}
