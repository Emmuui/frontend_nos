import * as React from 'react'
import Button from '@mui/material/Button'
import { format } from 'date-fns'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'

const emails = ['username@gmail.com', 'user02@gmail.com']

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

type PurchaseType = {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseType>()
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }
  const handleListItemClick = (value: PurchaseType) => {
    const date = new Date()

    const assetData = {
      assetId: 1,
      price: value.price,
      quantity: value.quantity,
      transactionDate: date.toISOString(),
    } as AddAssetType

    onClose(value.asset_name)
  }

  return (
    <Dialog onClose={handleClose} open={open} className={styles.add_asset_dialog_container}>
      <h1 className={styles.asset_title}>Add new asset</h1>
      <form onSubmit={handleSubmit(handleListItemClick)}>
        <div className={styles.form__container}>
          <TextField
            id={'Asset name'}
            variant={'standard'}
            label={'Asset name'}
            className={styles.text_field}
            inputProps={register('asset_name', {})}
          />
          {errors?.asset_name?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.asset_name?.message}
            </Typography>
          )}
          <TextField
            id={'Price'}
            label={'Price'}
            className={styles.text_field}
            variant={'standard'}
            inputProps={register('price', {})}
          />
          {errors?.price?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.price?.message}
            </Typography>
          )}
          <TextField
            id={'Quantity'}
            className={styles.text_field}
            label={'Quantity'}
            variant={'standard'}
            inputProps={register('quantity', {})}
          />
          {errors?.quantity?.message && (
            <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
              {errors?.quantity?.message}
            </Typography>
          )}
          <div className={styles.submit_button_container}>
            <Button variant={'contained'} type={'submit'} className={styles.submit_button}>
              <Typography variant={'inherit'}>Add</Typography>
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  )
}

export default AddAssetDialog
