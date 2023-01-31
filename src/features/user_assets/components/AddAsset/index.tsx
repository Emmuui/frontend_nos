import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import useSearchAsset from 'features/user_assets/hooks/useSearchAsset'
import { useCallback, useState } from 'react'
import { useDebounce } from 'shared/hooks/useDebounce'
import { useAssetTransactions } from 'features/user_assets/hooks/useAssetTransactions'
import { SelectAsset } from 'shared/components/SelectAsset'
import { AssetResponse } from 'features/user_assets/ts'

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
  const [page, setPage] = useState<number>(2)
  const { handlePurchaseAsset } = useAssetTransactions()
  const [selectedAsset, setSelectedAsset] = useState<AssetResponse>({} as AssetResponse)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseType>()
  const { onClose, selectedValue, open } = props
  const debounce_search = useDebounce(searchAsset, 500)

  const { assets, loading } = useSearchAsset({
    limit: 10,
    page: 1,
    search: debounce_search,
  })

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAsset(event.target.value)
  }

  const handleSelectedAsset = useCallback(
    (data: AssetResponse): void => {
      setSelectedAsset(data)
    },
    [setSelectedAsset]
  )

  const handleListItemClick = (value: PurchaseType) => {
    const date = new Date()

    const assetData = {
      assetId: selectedAsset.id,
      price: value.price,
      quantity: value.quantity,
      transactionDate: date.toISOString(),
    } as AddAssetType
    handlePurchaseAsset(assetData)
    onClose(value.asset_name)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
    >
      <form onSubmit={handleSubmit(handleListItemClick)} className={styles.form__container}>
        <Box
          display='flex'
          width={'40vw'}
          height={'90vh'}
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          className={styles.box__container}
        >
          <h1 className={styles.asset_title}>Add new asset</h1>
          <div className={styles.text_field__container}>
            <div className={styles.text_field_1}>
              <TextField
                id={'Price'}
                label={'Price'}
                variant={'outlined'}
                className={styles.input__field}
                InputProps={register('price', {})}
              />
              {errors?.price?.message && (
                <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
                  {errors?.price?.message}
                </Typography>
              )}
            </div>
            <div className={styles.text_field_2}>
              <TextField
                id={'Quantity'}
                label={'Quantity'}
                variant={'outlined'}
                className={styles.input__field}
                InputProps={register('quantity', {})}
              />
              {errors?.quantity?.message && (
                <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
                  {errors?.quantity?.message}
                </Typography>
              )}
            </div>
          </div>
          <TextField
            name='Type asset name here'
            className={styles.search_field}
            label='Type asset name here'
            variant={'standard'}
            InputProps={{ disableUnderline: true }}
            value={searchAsset}
            onChange={handleSearchChange}
            required={true}
          />
          <div className={styles.asset_to_select}>
            <ul className={styles.ul}>
              {assets?.length && !loading ? (
                assets.map(asset => {
                  return (
                    <li key={asset.id}>
                      <SelectAsset asset={asset} selected_asset={handleSelectedAsset} />
                    </li>
                  )
                })
              ) : (
                <CircularProgress />
              )}
            </ul>
          </div>
          <div className={styles.submit_button_container}>
            <Button variant={'contained'} type={'submit'} className={styles.submit_button}>
              <Typography variant={'inherit'}>Add</Typography>
            </Button>
          </div>
        </Box>
      </form>
    </Dialog>
  )
}

export default AddAssetDialog
