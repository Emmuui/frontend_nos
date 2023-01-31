import { Route, Routes } from 'react-router-dom'
import { AUTH_ROUTES } from './paths'
import LoginPage from 'pages/LoginPage'
import React from 'react'
import SignUpPage from 'pages/SignUpPage'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={AUTH_ROUTES.static.login} element={<LoginPage />} />
      <Route path={AUTH_ROUTES.static.sign_up} element={<SignUpPage />} />
    </Routes>
  )
}

export default AuthRoutes
