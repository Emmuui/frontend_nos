import { useForm } from 'react-hook-form'
import { AuthFormInputs, DashboardRegistrationRequest } from 'business_logic/auth/ts'
import styles from './styles.module.scss'
import { Box, Button, Link, Typography } from '@mui/material'
import { EmailInput } from 'shared/components/EmailInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'shared/schemas/schemas'
import useAuth from 'business_logic/auth/hooks/useAuth'
import { TextFieldComponent } from 'shared/components/TextField'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(schema),
  })
  const { SignUp, isAuth, dispatch } = useAuth()

  const navigate = useNavigate()

  const handleNavigateSignIn = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const onSubmit = (data: AuthFormInputs) => {

    const convertedData = {
      email: data.email?.trim(),
      username: data.username?.trim(),
      password: data.password?.trim(),
    }

    dispatch(SignUp(convertedData as DashboardRegistrationRequest))
  }

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
        Create new Account
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
        <TextFieldComponent
          id={'username'}
          label={'Username'}
          register={register('username', {})}
          error={errors?.username?.message}
        />
        <PasswordInput
          id={'password'}
          label={'Password'}
          register={register('password', {
            required: { value: true, message: 'This field is required' },
            minLength: { value: 8, message: 'Password length should be more than 8.' },
          })}
          error={errors?.password?.message}
        />
        <PasswordInput
          id={'confirmPassword'}
          label={'Repeat Password'}
          register={register('confirmPassword', {
            required: { value: true, message: 'This field is required' },
            minLength: { value: 8, message: 'Password length should be more than 8.' },
          })}
          error={errors?.confirmPassword?.message}
        />
        <Button variant={'contained'} type={'submit'} disabled={false} className={styles.sign_up__button}>
          <Typography variant={'inherit'}>Sign Up</Typography>
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
        Already have an account?{' '}
        <Link onClick={handleNavigateSignIn} color={'darkgray'} underline='hover' className={styles.sign_in__button}>
          Sign in now
        </Link>
      </Typography>
    </Box>
  )
}

export default SignUpForm
