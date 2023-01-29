import { ReactElement, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './styles.module.scss'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface EmailInputProps {
  label?: string
  id?: string
  error?: string
  register: UseFormRegisterReturn
  placeholder?: string
}

export const PasswordInput = ({ label, id, error, placeholder = label, register }: EmailInputProps): ReactElement => {
  const [hiddenPassword, setHiddenPassword] = useState(true)
  return (
    <div>
      <div className={styles.password__input}>
        <TextField
          id={id}
          InputProps={{ disableUnderline: true, ...register }}
          required={true}
          type={hiddenPassword ? 'password' : 'text'}
          placeholder={placeholder}
          variant={'standard'}
          name={label}
          color={'primary'}
          fullWidth={true}
          autoComplete={'off'}
          className={styles.input}
        />
        {hiddenPassword ? (
          <Box className={styles.password__visibility__button}>
            <VisibilityOffIcon
              className={styles.password_icon}
              onClick={(): void => setHiddenPassword(!hiddenPassword)}
            />
          </Box>
        ) : (
          <Box className={styles.password__visibility__button}>
            <VisibilityIcon className={styles.password_icon} onClick={(): void => setHiddenPassword(!hiddenPassword)} />
          </Box>
        )}
      </div>
      {error && (
        <Typography className={styles.input__error_message} variant={'inherit'} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
