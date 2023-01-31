import useAuth from 'features/auth/hooks/useAuth'
import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (): ReactElement => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
