import React from 'react'
// import useAuth from 'auth/hooks/useAuth'
import { LoginRequest } from 'auth/ts'
// import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  // const { Login, isAuth } = useAuth()
  // const navigate = useNavigate()
  const {
    handleSubmit,
  } = useForm<LoginRequest>()
  const onSubmit = () => {
    // Login({email: 'nikityuk.off@gmail.com', password: 'Admin_1234'})
  }

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/')
  //   }
  // }, [isAuth])

  return (
    <>
      <div>LoginForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button>Click me</button>
      </form>
    </>
  )
}

export default LoginForm
