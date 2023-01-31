import { AssetResponse } from 'features/user_assets/ts'
import styles from './styles.module.scss'
import { Avatar } from '@mui/material'
import React from 'react'

type SelectAssetType = {
  asset: AssetResponse
  selected_asset: (arg: AssetResponse) => void
}

export const SelectAsset = ({ asset, selected_asset }: SelectAssetType) => {
  const handleSelectedAsset = () => {
    selected_asset(asset)
  }

  return (
    <div className={styles.single_asset__container}>
      <Avatar
        alt={asset.name}
        src={asset.externalImageUrl ?? asset.internalImageUrl ?? ''}
        className={styles.asset_image}
      />
      <p className={styles.asset__info}>{asset.name.slice(0, 10)}</p>
      <p className={styles.asset__info}>{asset.currentPrice.toFixed(2)}$</p>
      <input className={styles.checkBox} id={`${asset.id}`} name='radio' type='radio' onChange={handleSelectedAsset} />
      <label htmlFor={`${asset.id}`} className={styles.checkBoxWrapper} />
    </div>
  )
}
