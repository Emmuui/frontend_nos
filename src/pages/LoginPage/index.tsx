import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import styles from './styles.module.scss';
import LoginForm from 'auth/components/Login'

const LoginPage = (): ReactElement => {
  return (
    <Grid container className={styles.login__page}>
      <Grid container className={styles.login__page__container}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid container className={styles.login__page__sign_in__form__container}>
            <LoginForm />
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
