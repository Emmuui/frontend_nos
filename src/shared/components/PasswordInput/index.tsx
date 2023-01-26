import { ReactElement, useState } from 'react'
import { TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './styles.module.scss';

interface EmailInputProps {
  label?: string
  id?: string
  error?: string
  register: UseFormRegisterReturn
  placeholder?: string
}

export const PasswordInput = ({ label, id, error, placeholder = label, register }: EmailInputProps): ReactElement => {
  return (
    <div className={styles.password__input}>
      <TextField
        id={id}
        InputProps={{ ...register }}
        required={true}
        type={'password'}
        placeholder={placeholder}
        variant={'outlined'}
        name={label}
        color={'primary'}
        fullWidth={true}
        autoComplete={'off'}
      />
      {error && (
        <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
