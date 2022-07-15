import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PrivateRoute } from './components/PrivateRoute';

import {
  Servers,
  Server,
  Login,
  Logout,
  Developing,
  NotFound,
  Users,
} from './pages';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setUser } from './redux/actions/auth-actions';
import { appTheme } from './utils/theme';
import { AppRoutes } from './utils/routes';
import { fetchUser } from './services/api';

const SIDEBAR_WIDTH = 320;
const APP_NAME = String(process.env.REACT_APP_NAME);

const theme = createTheme(appTheme);

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  /**
   * Fetch user from backend if it logged in,
   * but user data doesn't exists
   */
  useEffect(() => {
    (async () => {
      if (isLoggedIn && !user) {
        const fetchedUser = await fetchUser();
        dispatch(setUser(fetchedUser));
      }
    })();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {isLoggedIn && (
          <Header sidebarWidth={SIDEBAR_WIDTH} appName={APP_NAME} />
        )}
        {isLoggedIn && <Sidebar sidebarWidth={SIDEBAR_WIDTH} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 6,
            height: '100%',
          }}>
          <Toolbar />
          <Routes>
            <Route path={AppRoutes.Login} element={<Login />} />
            <Route path={AppRoutes.Logout} element={<Logout />} />
            <Route
              path={AppRoutes.Servers}
              element={
                <PrivateRoute>
                  <Servers />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoutes.Server}
              element={
                <PrivateRoute>
                  <Server />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoutes.Patchnotes}
              element={
                <PrivateRoute>
                  <Developing />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoutes.Donates}
              element={
                <PrivateRoute>
                  <Developing />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoutes.Users}
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoutes.Profile}
              element={
                <PrivateRoute>
                  <Developing />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <NotFound />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export { App };
