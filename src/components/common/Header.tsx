import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../utils/routes';

type HeaderProps = { appName: string; sidebarWidth: number };

const Header = ({ appName, sidebarWidth }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        boxShadow: 0,
        backgroundImage: 'none',
        bgcolor: 'rgba(10, 25, 41, 0.6)',
        backdropFilter: 'blur(20px)',
        px: 3,
      }}>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}>
        <Button component={Link} to={AppRoutes.Servers} variant="text">
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: 700 }}>
            {appName}
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
