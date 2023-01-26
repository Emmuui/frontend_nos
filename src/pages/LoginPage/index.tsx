import React, { ReactElement } from 'react';
import { Grid, Typography } from '@mui/material'
import styles from './styles.module.scss';
import LoginForm from 'auth/components/Login'

const LoginPage = (): ReactElement => {
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
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
