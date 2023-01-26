import { ReactElement } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './styles.module.scss';

interface EmailInputProps {
  label?: string
  id?: string
  error?: string
  register: UseFormRegisterReturn
  placeholder?: string
}

export const EmailInput = ({ label, id, error, placeholder = label, register }: EmailInputProps): ReactElement => {
  return (
    <div className={styles.email__input}>
      <TextField
        id={id}
        InputProps={{ ...register }}
        required={true}
        type={'text'}
        placeholder={placeholder}
        variant={'outlined'}
        name={label}
        color={'primary'}
        fullWidth={true}
        autoComplete={'off'}
      />
      {error && (
        <Typography className={''} variant={'inherit'} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
