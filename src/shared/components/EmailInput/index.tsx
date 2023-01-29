import { ReactElement } from 'react'
import { TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './styles.module.scss'

interface EmailInputProps {
  label?: string
  id?: string
  error?: string
  register: UseFormRegisterReturn
  placeholder?: string
}

export const EmailInput = ({ label, id, error, placeholder = label, register }: EmailInputProps): ReactElement => {
  return (
    <div>
      <div className={styles.email__input}>
        <TextField
          id={id}
          InputProps={{ disableUnderline: true, ...register }}
          required={true}
          type={'text'}
          placeholder={placeholder}
          variant={'standard'}
          name={label}
          color={'primary'}
          fullWidth={true}
          autoComplete={'off'}
          className={styles.input}
        />
      </div>
      {error && (
        <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
