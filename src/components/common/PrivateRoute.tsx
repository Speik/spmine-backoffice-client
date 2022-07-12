import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/routes';

type PrivateRouteProps = { isLoggedIn: boolean; children: JSX.Element };

const PrivateRoute = ({ isLoggedIn, children }: PrivateRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return children;
};

export { PrivateRoute };
