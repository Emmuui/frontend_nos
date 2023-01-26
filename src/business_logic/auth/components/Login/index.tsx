import React, { useEffect } from 'react'
import useAuth from 'business_logic/auth/hooks/useAuth'
import { LoginRequest } from 'business_logic/auth/ts'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Link, Typography, Box, Button } from '@mui/material'
import { EmailInput } from 'shared/components/EmailInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import styles from './styles.module.scss'

const LoginForm = () => {
  const { Login, isAuth, isLoading, user } = useAuth()
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()

  const handleNavigateSignUp = () => {
    navigate('/sign_up')
  }

  const onSubmit = (data: LoginRequest) => {
    Login(data)
  }
  console.log(user)

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  return (
    <Box className={styles.box_component}>
      <Typography
        variant={'subtitle1'}
        justifyContent={'center'}
        fontFamily={'BlinkMacSystemFont'}
        fontWeight={700}
        fontSize={25}
        letterSpacing={2.5}
        marginBottom={'40px'}
      >
        WELCOME TO NOSIS
      </Typography>
      <Typography
        variant={'subtitle1'}
        justifyContent={'center'}
        fontFamily={'BlinkMacSystemFont'}
        fontWeight={700}
        fontSize={20}
        letterSpacing={0.2}
        marginBottom={'25px'}
      >
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          id={'email'}
          label={'Email'}
          register={register('email', {
            required: { value: true, message: 'This field is required' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors?.email?.message}
        />
        <PasswordInput
          id={'password'}
          label={'Password'}
          register={register('password', {
            required: { value: true, message: 'This field is required' },
            minLength: { value: 8, message: 'Password length should be more than 8.' },
          })}
          error={errors?.email?.message}
        />
        <Button variant={'contained'} type={'submit'} disabled={isLoading} className={styles.login_button}>
          <Typography variant={'inherit'}>Login</Typography>
        </Button>
      </form>
      <Typography
        variant={'inherit'}
        marginTop={'70px'}
        fontFamily={'BlinkMacSystemFont'}
        fontWeight={500}
        fontSize={14}
        color={'grey'}
      >
        Not a member?{' '}
        <Link onClick={handleNavigateSignUp} color={'darkgray'} underline='hover'>
          Sign up now
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm
