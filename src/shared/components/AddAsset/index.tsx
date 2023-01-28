import * as React from 'react'
import Button from '@mui/material/Button'
import { format } from 'date-fns'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import InfiniteScroll from "react-infinite-scroll-component";

import { CircularProgress, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import useSearchAsset from '../../../business_logic/user_assets/hooks/useSearchAsset'
import { useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import load = Simulate.load
import { useDebounce } from '../../hooks/useDebounce'
import { AssetTable } from '../../../pages/assetTable'
import { useAssetTransactions } from '../../../business_logic/user_assets/hooks/useAssetTransactions'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

type PurchaseType = {
  asset_id: number
  asset_name: string
  price: number
  quantity: number
}

type AddAssetType = {
  assetId: number
  price: number
  quantity: number
  transactionDate: string
}

const AddAssetDialog = (props: SimpleDialogProps) => {
  const [searchAsset, setSearchAsset] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const { handlePurchaseAsset } = useAssetTransactions()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseType>()
  const { onClose, selectedValue, open } = props
  // const debounce_search = useDebounce(searchAsset, 500)
  //
  // const { assets, assetMeta, loading, error } = useSearchAsset(
  //   {
  //     limit: 10,
  //     page: page ?? 1,
  //     search: searchAsset,
  //   }
  // )
  const handleClose = () => {
    onClose(selectedValue)
  }

  // console.log(searchAsset, assets)
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchAsset(event.target.value)
  //   console.log(assets)
  // }

  const handleListItemClick = (value: PurchaseType) => {
    const date = new Date()

    const assetData = {
      assetId: value.asset_id,
      price: value.price,
      quantity: value.quantity,
      transactionDate: date.toISOString(),
    } as AddAssetType
    handlePurchaseAsset(assetData)
    onClose(value.asset_name)
  }

  return (
    <Dialog onClose={handleClose} open={open} className={styles.add_asset_dialog_container}>
      <h1 className={styles.asset_title}>Add new asset</h1>
      <form onSubmit={handleSubmit(handleListItemClick)} className={styles.form__container}>
        <div className={styles.text_field}>
          <TextField
            id={'Asset id'}
            variant={'outlined'}
            label={'Asset id'}
            inputProps={register('asset_id', {})}
          />
          {errors?.asset_name?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.asset_name?.message}
            </Typography>
          )}
        </div>
        <div className={styles.text_field}>
          <TextField id={'Price'} label={'Price'} variant={'outlined'} inputProps={register('price', {})} />
          {errors?.price?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.price?.message}
            </Typography> )}
        </div>
        <div className={styles.text_field}>
          <TextField id={'Quantity'} label={'Quantity'} variant={'outlined'} inputProps={register('quantity', {})} />
          {errors?.quantity?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.quantity?.message}
            </Typography>
          )}
        </div>
        {/*<TextField*/}
        {/*  name='Search asset'*/}
        {/*  label='Search asset'*/}
        {/*  value={searchAsset}*/}
        {/*  onChange={handleSearchChange}*/}
        {/*/>*/}
        {/*{*/}
        {/*  !loading && assets && (*/}
        {/*    <AssetTable assets={assets} loading={loading} title={'Results'}></AssetTable>*/}
        {/*  )*/}
        {/*}*/}
        {/*<InfiniteScroll*/}
        {/*  dataLength={assets?.length ?? 0}*/}
        {/*  next={() => setPage(page + 1)}*/}
        {/*  hasMore={true}*/}
        {/*  loader={<CircularProgress/>}*/}
        {/*>*/}
        {/*  <ul>*/}
        {/*    {assets?.map(asset => {*/}
        {/*      return (*/}
        {/*        <li key={asset.id}>*/}
        {/*          {asset.name}*/}
        {/*        </li>*/}
        {/*      )*/}
        {/*    })}*/}
        {/*  </ul>*/}
        {/*</InfiniteScroll>*/}
        <div className={styles.submit_button_container}>
          <Button variant={'contained'} type={'submit'} className={styles.submit_button}>
            <Typography variant={'inherit'}>Add</Typography>
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default AddAssetDialog
