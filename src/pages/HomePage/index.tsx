import React, { ReactElement } from 'react';
import { GetPopularAsset } from 'business_logic/popular_assets/components/PopularAssets'
import styles from './styles.module.scss'
import { Grid } from '@mui/material'

const HomePage = (): ReactElement => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop={'25px'}
      style={{ minHeight: '100vh', minWidth: '750px' }}
    >
      <Grid item xs={10}>
        <GetPopularAsset/>
      </Grid>
    </Grid>
  )
}

export default HomePage
