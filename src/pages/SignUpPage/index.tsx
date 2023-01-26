import React, { ReactElement } from 'react'
import { Grid } from '@mui/material'
import SignUpForm from 'business_logic/auth/components/SignUp'

const SignUpPage = (): ReactElement => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', minWidth: '650px' }}
    >
      <Grid item xs={6}>
        <SignUpForm />
      </Grid>
    </Grid>
  );
}

export default SignUpPage
