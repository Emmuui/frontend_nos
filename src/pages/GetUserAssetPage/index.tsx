import React, { ReactElement } from 'react';
import { GetUserAsset } from 'features/user_assets/components/GetUserAsset'
import { Grid } from '@mui/material'

const GetUserAssetPage = (): ReactElement => {
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
        <GetUserAsset/>
      </Grid>
    </Grid>
  )
}

export default GetUserAssetPage
