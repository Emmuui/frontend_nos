import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from 'routes/routes'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import SignUpPage from 'pages/SignUpPage'


type RouteType = {
  path: string
  element: ReactElement
}

const AppRoutes = (): ReactElement => {
  const routes = {
    publicRoutes: [
      { path: ROUTES.home, element: <HomePage />},
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.sign_up, element: <SignUpPage /> },
    ],
    privateRoutes: [
      // { path: ROUTES.profilePage.path, element: <ProfilePage tabIndex={2} /> },
    ],
  }

  return (
    <BrowserRouter>
      <Routes>
        {Object(routes.publicRoutes).map((route: RouteType, index: number) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/*{Object(routes.privateRoutes).map((route: RouteType, index: number) => (*/}
        {/*  <Route key={index} path={route.path} element={<PrivateRoute />}>*/}
        {/*    <Route path={route.path} element={route.element} />*/}
        {/*  </Route>*/}
        {/*))}*/}
        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
