import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { PrivateRoute } from './components/common/PrivateRoute';

import { Servers, Server, Login, Logout, Developing, NotFound } from './pages';

import { appTheme } from './utils/theme';
import { AppRoutes } from './utils/routes';
import { useAppSelector } from './redux/hooks';

const SIDEBAR_WIDTH = Number(process.env.REACT_APP_SIDEBAR_WIDTH);
const APP_NAME = String(process.env.REACT_APP_NAME);

const theme = createTheme(appTheme);

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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
                  <Developing />
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
