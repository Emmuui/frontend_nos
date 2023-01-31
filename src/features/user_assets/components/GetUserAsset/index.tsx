import useUserAsset from 'features/user_assets/hooks/useUserAsset'
import { Button, CircularProgress } from '@mui/material'
import AssetTableData from 'shared/components/AssetTable'
import styles from './styles.module.scss'
import { useMemo } from 'react'
import * as React from 'react'
import AddAssetDialog from 'features/user_assets/components/AddAsset'


export const GetUserAsset = () => {
  const { userAsset, loading } = useUserAsset()
  const close = ['']
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(close[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

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

  const tableRows = userAsset?.items ? userAsset?.items.map(asset =>
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
  ) : null

  return (
    <div className={styles.asset_table__container}>
      {tableRows?.length && userAsset?.items ? (
        <>
          <div className={styles.search_bar}>
            <Button className={styles.add_asset_button} onClick={handleClickOpen}>
              <p className={styles.add_asset__text}>Add Asset</p>
            </Button>
          </div>
          <AddAssetDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
          <AssetTableData head={head} data={tableRows} />
        </>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}
