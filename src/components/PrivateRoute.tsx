import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';
import { AppRoutes } from '../utils/routes';

type PrivateRouteProps = { children: JSX.Element };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return children;
};

export { PrivateRoute };
