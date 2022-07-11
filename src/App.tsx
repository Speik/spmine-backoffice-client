import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Servers } from './pages/Servers';
import { Server } from './pages/Server';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';

import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';

import { appTheme } from './utils/theme';
import { AppRoutes } from './utils/routes';

const SIDEBAR_WIDTH = Number(process.env.REACT_APP_SIDEBAR_WIDTH);
const APP_NAME = String(process.env.REACT_APP_NAME);

const theme = createTheme(appTheme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Header sidebarWidth={SIDEBAR_WIDTH} appName={APP_NAME} />
        <Sidebar sidebarWidth={SIDEBAR_WIDTH} />
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
            <Route path={AppRoutes.Servers} element={<Servers />} />
            <Route path={AppRoutes.Server} element={<Server />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export { App };
