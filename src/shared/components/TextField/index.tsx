import { ReactElement } from 'react'
import { TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './styles.module.scss'

interface TextFieldComponent {
  label?: string
  id?: string
  error?: string
  register: UseFormRegisterReturn
  placeholder?: string
}

export const TextFieldComponent = ({
  label,
  id,
  error,
  placeholder = label,
  register,
}: TextFieldComponent): ReactElement => {
  return (
    <div className={styles.text_field__input}>
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
      {error && (
        <Typography className={''} variant={'inherit'} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
