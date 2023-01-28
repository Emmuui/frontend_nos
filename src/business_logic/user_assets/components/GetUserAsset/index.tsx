import useUserAsset from 'business_logic/user_assets/hooks/useUserAsset'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import AssetTableData from 'shared/components/AssetTable'
import styles from './styles.module.scss'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import AddAssetDialog from 'shared/components/AddAsset'
// import SearchIcon from '@mui/icons-material/Search'

type SearchBar = {
  value: string
}

export const GetUserAsset = () => {
  const { userAsset, loading } = useUserAsset()
  const emails = ['username@gmail.com', 'user02@gmail.com']
  const { handleSubmit, register } = useForm<SearchBar>()
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  console.log('test', userAsset)
  const handleSearchAsset = (data: string) => {
    setSearch(data)
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

  const tableRows = userAsset?.items.map(asset =>
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
    <div className={styles.asset_table__container}>
      {tableRows?.length ? (
        <>
          <div className={styles.search_bar}>
            {/*<TextField*/}
            {/*  variant='standard'*/}
            {/*  placeholder={'search by asset name'}*/}
            {/*  onChange={event => handleSearchAsset(event.target.value)}*/}
            {/*/>*/}
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
